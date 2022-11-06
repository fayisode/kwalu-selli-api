import {Either, Result} from "../../../../shared/core/Result";
import {ChangePasswordError} from "./change_password_error";

export type ChangePasswordResponse = Either<ChangePasswordError.InvalidPassword
    | ChangePasswordError.IncompleteRequest
    | ChangePasswordError.UnAuthorizedAccess
    , Result<any>
    | Result<void>>
