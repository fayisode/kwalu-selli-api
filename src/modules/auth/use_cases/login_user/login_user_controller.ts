import {BaseController} from "../../../../shared/infra/http/models/BaseController";
import e from "express";
import {LoginUserUseCase} from "./login__user_use_case";
import {LoginUserDto} from "./login_user_dto";
import {TextUtils} from "../../../../shared/utils/TextUtils";
import {LoginUserError} from "./login_user_error";

export class LoginUserController extends BaseController {
    private useCase: LoginUserUseCase;

    constructor(useCase: LoginUserUseCase) {
        super();
        this.useCase = useCase;
    }

    protected async executeImpl(req: e.Request, res: e.Response): Promise<any> {
        let dto: LoginUserDto = req.body as LoginUserDto;

        dto = {
            email: TextUtils.sanitize(dto.email),
            password: dto.password,
        }

        try {
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case LoginUserError.EmailDoesNotExist:
                        return this.conflict(res, error.getErrorValue().message);
                    case LoginUserError.ValuePropsError:
                        return this.clientError(res, error.getErrorValue().message);
                    case LoginUserError.PasswordDoesNotMatch:
                        return this.conflict(res, error.getErrorValue().message);
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