import {Either, Result} from "../../../../shared/core/Result";
import {ResetPasswordError} from "./reset_password_errors";

export type ResetPasswordResponse = Either<
    ResetPasswordError.EmailDoesNotExist |
    ResetPasswordError.ValuePropsError |
    ResetPasswordError.MailServiceFailed
    ,
    Result<any> | Result<void>>