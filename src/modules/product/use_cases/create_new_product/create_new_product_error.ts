import {Result} from "../../../../shared/core/Result";
import {UseCaseError} from "../../../../shared/core/UseCaseError";

export namespace CreateNewProductError {
    export class ValuePropsError extends Result<UseCaseError> {
        constructor(value: Result<any>) {
            super(false, {
                message: `Value props error: ${value.getErrorValue()}`
            } as UseCaseError);
        }
    }

    export class UnAuthorized extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `UnAuthorized Access`
            } as UseCaseError);
        }
    }
}
