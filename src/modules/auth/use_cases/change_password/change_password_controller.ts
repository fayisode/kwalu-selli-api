import {BaseController} from "../../../../shared/infra/http/models/BaseController";
import e from "express";
import {ChangePasswordUseCase} from "./change_passsword_usecase";
import {ChangePasswordDto} from "./change_password_dto";
import {ChangePasswordError} from "./change_password_error";

export class ChangePasswordController extends BaseController {
    private useCase: ChangePasswordUseCase

    constructor(useCase: ChangePasswordUseCase) {
        super();
        this.useCase = useCase;
    }

    protected async executeImpl(req: e.Request, res: e.Response): Promise<any> {
        let dto: ChangePasswordDto
        try {
            dto = {
                newPassword: req.body.password as string,
                token: req.headers.token as string,
                userDetails: {
                    identifier: req.headers.identifier as string,
                    type: req.body.type as string,
                    date: req.body.date as string
                }
            }
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case ChangePasswordError.InvalidPassword:
                        return this.clientError(res, error.getErrorValue().message);
                    case ChangePasswordError.UnAuthorizedAccess:
                        return this.unauthorized(res, error.getErrorValue().message);
                    case ChangePasswordError.IncompleteRequest:
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