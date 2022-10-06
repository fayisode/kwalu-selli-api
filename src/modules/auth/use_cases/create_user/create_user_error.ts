import {Result} from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export namespace CreateUserError{
    export class EmailAlreadyExist extends Result<UseCaseError>{
        constructor(email: string) {
            super(false, {
                message: `Email ${email} already exist`
            } as UseCaseError);
        }
    }

    export class ValuePropsError extends Result<UseCaseError>{
        constructor(value: Result<any>) {
            super(false, {
                message: `Value props error: ${value.getErrorValue()}`
            } as UseCaseError);
        }
    }
}