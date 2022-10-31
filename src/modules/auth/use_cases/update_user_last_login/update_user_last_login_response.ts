import {Either, Result} from "../../../../shared/core/Result";
import {AppError} from "../../../../shared/core/AppError";

export type UpdateUserLastLoginResponse =
    Either<AppError.UnexpectedError,
        Result<any> | Result<void>>