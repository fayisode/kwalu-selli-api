import {Result} from "../../../../shared/core/Result";
import {UseCaseError} from "../../../../shared/core/UseCaseError";


export namespace GetProductUseCaseError {
    export class UnAuthorized extends Result<UseCaseError> {
        constructor() {
            super(
                false,
                {
                    message: `You are not authorized to access this resource`,
                } as UseCaseError
            );
        }
    }

    export class ProductNotFound extends Result<UseCaseError> {
        constructor() {
            super(
                false,
                {
                    message: `Product not found`,
                } as UseCaseError
            );
        }
    }
}