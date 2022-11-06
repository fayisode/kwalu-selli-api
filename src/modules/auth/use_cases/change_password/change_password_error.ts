import {Result} from "../../../../shared/core/Result";
import {UseCaseError} from "../../../../shared/core/UseCaseError";

export namespace ChangePasswordError {
    export class InvalidPassword extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `Invalid Password`
            } as UseCaseError)
        }
    }

    export class UnAuthorizedAccess extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `UnAuthorized Access`
            } as UseCaseError)
        }
    }

    export class IncompleteRequest extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `Incomplete Request`
            } as UseCaseError)
        }
    }
}