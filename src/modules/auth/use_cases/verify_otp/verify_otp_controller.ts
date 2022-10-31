import {BaseController} from "../../../../shared/infra/http/models/BaseController";
import e from "express";
import {VerifyOtpUseCase} from "./verify_otp_use_case";
import {ResetPasswordDto} from "../reset_password/reset_password_dto";
import {VerifyOtpDto} from "./verify_otp_dto";
import {ResetPasswordError} from "../reset_password/reset_password_errors";
import {VerifyOtpError} from "./verify_otp_error";
export class VerifyOtpController extends BaseController{
    private useCase: VerifyOtpUseCase
    constructor(useCase: VerifyOtpUseCase) {
        super();
        this.useCase = useCase;
    }
    protected async executeImpl(req: e.Request, res: e.Response): Promise<any> {
        let dto:VerifyOtpDto


        try{
            dto = {
                token: req.headers.token as string,
                userDetails: {
                    process_name: req.body.process_name as string,
                    otp: req.body.otp as string,
                    identifier: req.headers.identifier as string,
                    time: req.body.time,
                    type: req.body.type as string
                }
            }
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case VerifyOtpError.InvalidToken:
                        return this.clientError(res, error.getErrorValue().message);
                    case VerifyOtpError.UnAuthorized:
                        return this.clientError(res, error.getErrorValue().message);
                    default:
                        return this.fail(res, error.getErrorValue().message);
                }
            } else {
                return this.ok(res, result.value.getValue());
            }
        }catch (e) {
            return this.fail(res, e);
        }
    }
}