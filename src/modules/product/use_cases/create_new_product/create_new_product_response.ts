import {Either, Result} from "../../../../shared/core/Result";
import {AppError} from "../../../../shared/core/AppError";
import {CreateNewProductError} from "./create_new_product_error";

export type CreateNewProductResponse = Either<AppError.UnexpectedError
    | CreateNewProductError.ValuePropsError
    | CreateNewProductError.UnAuthorized
    , Result<void> | Result<any>>;