import {Result} from "../../../../shared/core/Result";
import {UseCaseError} from "../../../../shared/core/UseCaseError";

export namespace VerifyOtpError {
    export class InvalidToken extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `Invalid Token`
            } as UseCaseError)
        }
    }

    export class UnAuthorized extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `Invalid Otp. Try again`
            } as UseCaseError)
        }
    }
}