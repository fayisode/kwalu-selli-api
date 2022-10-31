import {Either, Result} from "../../../../shared/core/Result";
import {AppError} from "../../../../shared/core/AppError";
import {VerifyOtpError} from "./verify_otp_error";

export type VerifyOtpResponse = Either<VerifyOtpError.InvalidToken
    |VerifyOtpError.UnAuthorized | AppError.UnexpectedError,
    Result<any> | Result<void>>