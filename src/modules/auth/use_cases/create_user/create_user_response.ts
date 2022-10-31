import {Either, Result} from "../../../../shared/core/Result";
import {CreateUserError} from "./create_user_error";
import {AppError} from "../../../../shared/core/AppError";

export type CreateUserResponse = Either<CreateUserError.EmailAlreadyExist
    | CreateUserError.ValuePropsError
    | AppError.UnexpectedError,
    Result<any>
    | Result<void>>