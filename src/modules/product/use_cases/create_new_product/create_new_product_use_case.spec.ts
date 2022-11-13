import {Either, left, Result, right} from "../../../../shared/core/Result";
import {AppError} from "../../../../shared/core/AppError";
import {UseCase} from "../../../../shared/core/UseCase";
import {UserProduct} from "../../domain/entity/user_product";
import {ProductCategory} from "../../domain/value_object/product_category";
import {ProductDescription} from "../../domain/value_object/product_description";
import {ProductImage} from "../../domain/value_object/product_image";
import {ProductName} from "../../domain/value_object/product_name";
import {ProductPrice} from "../../domain/value_object/product_price";
import {Mock} from "moq.ts";
import {ICloudinary} from "../../services/i_cloudinary";
import {AuthService} from "../../../auth/services/auth_service";
import {IProductWriteRepo} from "../../repos/i_product_write_repo";
import {CreateNewProductDto} from "./create_new_product_dto";
import {CreateNewProductResponse} from "./create_new_product_response";
import {CreateNewProductUseCase} from "./create_new_product_use_case";

const fs = require('fs');
describe('Create New Product', () => {
    let result: CreateNewProductResponse
    let useCase: CreateNewProductUseCase
    let dto: CreateNewProductDto
    beforeEach(() => {
        dto = null
        result = null
        useCase = new CreateNewProductUseCase(
            mockCloudinary().object(),
            mockAuthService().object(),
            mockProductWriteRepo().object()
            );
    })

    it('given an invalid token, should return unauthorized error', async () => {
        dto = {
            token: token,
            name: '',
            description: '',
            price: 0,
            category: '',
            image: null
        }
        result = await useCase.execute(dto)
        expect(result.value.isFailure).toBeTruthy();
        expect(result.value.getErrorValue().message).not.toBeNull()
    })

    it('given an invalid value, return value props error', async function () {
        dto = {
            token: validToken,
            name: '',
            description: '',
            price: 0,
            category: '',
            image: null
        }
        result = await useCase.execute(dto)
        expect(result.value.isFailure).toBeTruthy();
        expect(result.value.getErrorValue().message).not.toBeNull()
    });


    it('given an invalid image or null, return image props error', async function () {
        dto = {
            token: validToken,
            name: nameValue,
            description: descriptionValue,
            price: 0,
            category: categoryValue,
            image: null
        }
        result = await useCase.execute(dto)
        expect(result.value.isFailure).toBeTruthy();
        expect(result.value.getErrorValue().message).not.toBeNull()

        dto = {
            token: validToken,
            name: nameValue,
            description: descriptionValue,
            price: 1,
            category: categoryValue,
            image: null
        }
        result = await useCase.execute(dto)
        expect(result.value.isFailure).toBeTruthy();
        expect(result.value.getErrorValue().message).not.toBeNull()
    })

    it('given list of images, should send image to cloudinary', async () => {
        const price = 20;
        dto = {
            token: validToken,
            name: nameValue,
            description: descriptionValue,
            price: price,
            category: categoryValue,
            image: [file, file]
        }
        result = await useCase.execute(dto)
        expect(result.value.isSuccess).toBeTruthy()
    })
})

const descriptionValue = 'Aperiam perferendis fugit rerum eligendi. Omnis perspiciatis quia ut magni ipsa tempore. Sint fugiat ut ducimus eos debitis.';
const nameValue = 'test';
const categoryValue = 'FOOD';
let token = '451'
let validToken = '123'
function mockAuthService() {
    return new Mock<AuthService>().setup(service =>
        service.decodeJWT(token)).throwsAsync(Error(''))
        .setup(service =>
            service.decodeJWT(validToken)).returnsAsync(
            {
                userId: '1',
                email: 'test@test.com'
            }
        )
}

function mockProductWriteRepo(){
    const category = ProductCategory.create({value:categoryValue });
    const description= ProductDescription.create({value: descriptionValue});
    const name = ProductName.create({value: nameValue});
    const price= ProductPrice.create({value: 20});
    let productResult = UserProduct.create({
        category,
        description,
        name,
        price,
        image:[file,file]
    },)
    return new Mock<IProductWriteRepo>().setup(instance =>
        instance.save(productResult.getValue())).returnsAsync()
}


const file = fs.readFileSync('src/modules/product/use_cases/docker 11.png');

function mockCloudinary() {
    return new Mock<ICloudinary>().setup(instance => instance.uploadImage(file)).returnsAsync({
        secure_url: 'https://picsum.photos/200/300.jpeg'
    })
}

