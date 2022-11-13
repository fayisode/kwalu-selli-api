import {BaseController} from "../../../../shared/infra/http/models/BaseController";
import * as e from "express";
import {CreateNewProductUseCase} from "./create_new_product_use_case";
import {CreateNewProductDto} from "./create_new_product_dto";
import {TextUtils} from "../../../../shared/utils/TextUtils";
import {CreateNewProductError} from "./create_new_product_error";

export class CreateNewProductController extends BaseController {
    private useCase: CreateNewProductUseCase

    constructor(useCase: CreateNewProductUseCase) {
        super();
        this.useCase = useCase;
    }

    protected async executeImpl(req: e.Request, res: e.Response): Promise<any> {
        let dto: CreateNewProductDto
        try {
            dto = {
                token: req.headers.token as string,
                category: TextUtils.sanitize(req.body.category),
                description: TextUtils.sanitize(req.body.description),
                name: TextUtils.sanitize(req.body.name),
                price: req.body.price,
                // @ts-ignore
                image: req.files
            }

            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case CreateNewProductError.UnAuthorized:
                        return this.unauthorized(res, error.getErrorValue().message);
                    case CreateNewProductError.ValuePropsError:
                        return this.clientError(res, error.getErrorValue().message);
                    default:
                        return this.fail(res, error.getErrorValue().message);
                }
            } else {
                return this.ok(res, result.value.getValue());
            }
        } catch (e) {
            return this.fail(res, e);
        }
    }
}