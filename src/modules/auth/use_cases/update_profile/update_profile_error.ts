import {Result} from "../../../../shared/core/Result";
import {UseCaseError} from "../../../../shared/core/UseCaseError";

export namespace UpdateProfileError{
    export class ValuePropsError extends Result<UseCaseError>{
        constructor(value: Result<any>) {
            super(false, {
                message: `Value props error: ${value.getErrorValue()}`
            } as UseCaseError);
        }
    }
}