import {UseCase} from "../../../../shared/core/UseCase";
import {CreateNewProductDto} from "./create_new_product_dto";
import {CreateNewProductResponse} from "./create_new_product_response";
import {ICloudinary} from "../../services/i_cloudinary";
import {AuthService} from "../../../auth/services/auth_service";
import {IProductWriteRepo} from "../../repos/i_product_write_repo";
import {JWTClaims} from "../../../auth/domain/helper/jwt";
import {left, Result, right} from "../../../../shared/core/Result";
import {CreateNewProductError} from "./create_new_product_error";
import {ProductCategory} from "../../domain/value_object/product_category";
import {ProductDescription} from "../../domain/value_object/product_description";
import {ProductName} from "../../domain/value_object/product_name";
import {ProductPrice} from "../../domain/value_object/product_price";
import {UserProduct} from "../../domain/entity/user_product";
import {ProductImage} from "../../domain/value_object/product_image";
import {AppError} from "../../../../shared/core/AppError";

export class CreateNewProductUseCase implements UseCase<CreateNewProductDto, CreateNewProductResponse> {
    private cloudinary: ICloudinary;
    private authServices: AuthService
    private repo: IProductWriteRepo

    constructor(cloudinary: ICloudinary,
                authServices: AuthService,
                repo: IProductWriteRepo
    ) {
        this.cloudinary = cloudinary
        this.authServices = authServices
        this.repo = repo
    }

    async execute(request?: CreateNewProductDto):
        Promise<CreateNewProductResponse> {
        let decoded: JWTClaims
        try {
            decoded = await this.authServices.decodeJWT(request.token);
        } catch (e) {
            return left(new CreateNewProductError.UnAuthorized());
        }

        const category = ProductCategory.create({value: request.category});
        const description = ProductDescription.create({value: request.description});
        const name = ProductName.create({value: request.name});
        const price = ProductPrice.create({value: request.price});
        const productResult = Result.combine([
            category,
            description,
            name,
            price,
        ]);

        if (productResult.isFailure) {
            return left(new CreateNewProductError.ValuePropsError(productResult))
        }

        try {
            let imageProcessResponse
            try {
                imageProcessResponse = await processImage.call(this);
            } catch (e) {
                return left(new CreateNewProductError.ValuePropsError(
                    ProductImage.create({value: ''})))
            }
            let productResult = UserProduct.create({
                category,
                description,
                name,
                price,
                image: imageProcessResponse.imageResultList
            },)
            const product = productResult.getValue();
            product.imageAdded(imageProcessResponse.cloudinaryResultList, product.id)
            product.productCreated(decoded.email)
            await this.repo.save(product);
            return right(Result.ok(
                {
                    token: request.token,
                    message: 'Product successful added'
                }
            ))
        } catch (e) {
            return left(
                new AppError.UnexpectedError(e),
            );
        }

        async function processImage() {
            let cloudinaryResultList: any[] = []
            let imageResultList:Result< ProductImage>[] = []

            let image = request.image

            for(let i = 0; i < image.length; i++) {
                let cloudinaryResult = await this.cloudinary.uploadImage(image[i].path)
                cloudinaryResultList.push(cloudinaryResult)
                let imageResult = ProductImage.create({value: cloudinaryResult.secure_url})
                if (imageResult.isSuccess) {
                    imageResultList.push(imageResult)
                }
            }

            return {
                cloudinaryResultList,
                imageResultList
            }
        }
    }
}
