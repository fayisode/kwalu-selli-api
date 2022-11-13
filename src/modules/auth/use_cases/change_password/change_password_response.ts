import {Either, Result} from "../../../../shared/core/Result";
import {ChangePasswordError} from "./change_password_error";
import {AppError} from "../../../../shared/core/AppError";

export type ChangePasswordResponse = Either<ChangePasswordError.InvalidPassword
    | ChangePasswordError.IncompleteRequest
    | ChangePasswordError.UnAuthorizedAccess
    | AppError.UnexpectedError
    , Result<any>
    | Result<void>>
