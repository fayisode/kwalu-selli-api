import {Either, Result} from "../../../../shared/core/Result";
import {LoginUserError} from "./login_user_error";
import {AppError} from "../../../../shared/core/AppError";

export type LoginUserResponse = Either<LoginUserError.EmailDoesNotExist
    | LoginUserError.PasswordDoesNotMatch
    | LoginUserError.ValuePropsError
    | AppError.UnexpectedError,
    Result<any> | Result<void>>