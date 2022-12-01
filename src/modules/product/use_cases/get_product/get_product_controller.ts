import {BaseController} from "../../../../shared/infra/http/models/BaseController";
import e from "express";
import {GetProductUseCase} from "./get_product_use_case";
import {GetProductDto} from "./get_product_dto";
import {GetProductUseCaseError} from "./get_product_use_case_error";

export class GetProductController extends BaseController {
    private useCase: GetProductUseCase

    constructor(useCase: GetProductUseCase) {
        super();
        this.useCase = useCase;
    }

    protected async executeImpl(req: e.Request, res: e.Response): Promise<any> {
        let dto: GetProductDto
        let token: string = null
        let productId: string = null
        try {
            token = req.headers.token as string;
            productId = req.query.productId as string;
        } catch (e) {

        }

        dto = {
            token: token,
            productId: productId
        }
        try {
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case GetProductUseCaseError.UnAuthorized:
                        return this.unauthorized(res, error.getErrorValue().message);
                    case GetProductUseCaseError.ProductNotFound:
                        return this.notFound(res, error.getErrorValue().message);
                    default:
                        return this.fail(res, error.getErrorValue().message);
                }
            } else {
                return this.ok(res, result.value.getValue());
            }
        } catch
            (e) {
            return this.fail(res, e);
        }
    }

}