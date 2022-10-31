import {BaseController} from "../../../../shared/infra/http/models/BaseController";
import e from "express";
import {ResetPasswordUseCase} from "./reset_password_use_case";
import {ResetPasswordDto} from "./reset_password_dto";
import {LoginUserError} from "../login_user/login_user_error";
import {ResetPasswordError} from "./reset_password_errors";

export class ResetPasswordController extends BaseController{
    private useCase: ResetPasswordUseCase;
    constructor(useCase: ResetPasswordUseCase) {
        super();
        this.useCase = useCase;
    }

    protected async executeImpl(req: e.Request, res: e.Response): Promise<any> {
        let dto:ResetPasswordDto = req.body as ResetPasswordDto;

        dto = {
            email: dto.email,
        }

        try {
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case ResetPasswordError.EmailDoesNotExist:
                        return this.conflict(res, error.getErrorValue().message);
                    case ResetPasswordError.ValuePropsError:
                        return this.clientError(res, error.getErrorValue().message);
                    case ResetPasswordError.MailServiceFailed:
                        return this.fail(res, error.getErrorValue().message);
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