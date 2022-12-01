import {UseCase} from "../../../../shared/core/UseCase";
import {GetProductDto} from "./get_product_dto";
import {GetProductResponse} from "./get_product_response";
import {IProductReadRepo} from "../../repos/i_product_read_repo";
import {AuthService} from "../../../auth/services/auth_service";
import {JWTClaims} from "../../../auth/domain/helper/jwt";
import {left, Result, right} from "../../../../shared/core/Result";
import {GetProductUseCaseError} from "./get_product_use_case_error";
import {AppError} from "../../../../shared/core/AppError";

export class GetProductUseCase implements UseCase<GetProductDto, GetProductResponse> {
    private repo: IProductReadRepo
    private authServices: AuthService

    constructor(repo: IProductReadRepo,
                authServices: AuthService,) {
        this.repo = repo
        this.authServices = authServices
    }

    async execute(request?: GetProductDto):
        Promise<GetProductResponse> {

        let decoded: JWTClaims
        let email = null
        if (!!request.token) {
            try {
                decoded = await this.authServices.decodeJWT(request.token);
                email = decoded.email
            } catch (e) {
                return left(new GetProductUseCaseError.UnAuthorized());
            }
        }

        try {
            let products = await this.repo.read(email, request.productId)
            if (!products || Object.keys(products).length === 0) {
                return left(new GetProductUseCaseError.ProductNotFound())
            }
            return right(Result.ok({
                data: products
            }))
        } catch (e) {
            return left(
                new AppError.UnexpectedError(e),
            );
        }
    }
}

