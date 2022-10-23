import {Result} from "../../../../shared/core/Result";
import {UseCaseError} from "../../../../shared/core/UseCaseError";

export  namespace LoginUserError {
     export class EmailDoesNotExist extends Result<UseCaseError>{
        constructor(email: string) {
            super(false, {
                message: `Email ${email} does not exist`
            } as UseCaseError);
        }
     }

     export class PasswordDoesNotMatch extends Result<UseCaseError>{
        constructor() {
            super(false, {
                message: `Password does not match`
            } as UseCaseError);
        }
     }

     export class ValuePropsError extends Result<UseCaseError>{
        constructor( value: Result<any>) {
            super(false, {
                message: `Value props error: ${value.getErrorValue()}`
            } as UseCaseError);
        }
     }
}