import {BaseController} from "../../../../shared/infra/http/models/BaseController";
import e from "express";
import {CreateUserDto} from "./create_user_dto";
import {TextUtils} from "../../../../shared/utils/TextUtils";
import {CreateUserUseCase} from "./create_user_use_case";
import {CreateUserError} from "./create_user_error";

export class CreateUserController extends BaseController {
    private useCase: CreateUserUseCase;

    constructor(useCase: CreateUserUseCase) {
        super();
        this.useCase = useCase;
    }

    protected async executeImpl(req: e.Request, res: e.Response): Promise<any> {
        let dto: CreateUserDto = req.body as CreateUserDto;
        dto = {
            email: TextUtils.sanitize(dto.email),
            password: dto.password,
            firstName: TextUtils.sanitize(dto.firstName),
            lastName: TextUtils.sanitize(dto.lastName),
            phone: TextUtils.sanitize(dto.phone),
            nationalId: TextUtils.sanitize(dto.nationalId),
            location: TextUtils.sanitize(dto.location),
        }

        try {
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case CreateUserError.EmailAlreadyExist:
                        return this.conflict(res, error.getErrorValue().message);
                    case CreateUserError.ValuePropsError:
                        return this.clientError(res, error.getErrorValue().message);
                    default:
                        return this.fail(res, error.getErrorValue().message);
                }
            }else{
                return this.ok(res, result.value.getValue());
            }
        } catch (e) {
            return this.fail(res, e);
        }
    }

}