import {Either, Result} from "../../../../shared/core/Result";
import {AppError} from "../../../../shared/core/AppError";
import {GetProductUseCaseError} from "./get_product_use_case_error";


export type GetProductResponse = Either<AppError.UnexpectedError
    | GetProductUseCaseError.UnAuthorized
    | GetProductUseCaseError.ProductNotFound
    , Result<void> | Result<any>>;