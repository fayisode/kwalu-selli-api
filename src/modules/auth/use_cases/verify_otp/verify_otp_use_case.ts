import {UseCase} from "../../../../shared/core/UseCase";
import {VerifyOtpDto} from "./verify_otp_dto";
import {VerifyOtpResponse} from "./verify_otp_response";
import {AuthService} from "../../services/auth_service";
import {ProcessService} from "../../services/process_service";
import {IAuthRepo} from "../../repos/i_auth_repo";
import {left, Result, right} from "../../../../shared/core/Result";
import {VerifyOtpError} from "./verify_otp_error";
import {JWTClaims} from "../../domain/helper/jwt";
import {AppError} from "../../../../shared/core/AppError";

export class VerifyOtpUseCase implements UseCase<VerifyOtpDto, VerifyOtpResponse> {
    private authServices: AuthService
    private processService: ProcessService
    private authRepo: IAuthRepo

    constructor(authServices: AuthService,
                processService: ProcessService,
                authRepo: IAuthRepo) {
        this.authServices = authServices
        this.processService = processService
        this.authRepo = authRepo
    }

    async execute(request?: VerifyOtpDto): Promise<VerifyOtpResponse> {
        const token = request.token;
        if (!token) {
            return left(new VerifyOtpError.InvalidToken())
        }


        let decoded: JWTClaims
        try {
            decoded = await this.authServices.decodeJWT(token)
        } catch (e) {
            return left(new VerifyOtpError.InvalidToken())
        }


        try {
            let userDetails = await this.processService.checkOperationValid(decoded.userId, request.userDetails)
            if (!userDetails) {
                return left(new VerifyOtpError.UnAuthorized())
            }
        } catch (e) {
            return left(new VerifyOtpError.UnAuthorized())
        }


        try {
            const {identifier, type, date} = await generateProcessInfo.call(this);
            return right(Result.ok({
                token,
                type,
                identifier,
                operation: {
                    date,
                    type
                }
            }));
        } catch (e) {
            return left(
                new AppError.UnexpectedError(e),
            );
        }

        async function generateProcessInfo() {
            const identifier = this.processService.generateIdentifier();
            const type = 'email';
            const date =  new Date().toISOString();
            await this.authRepo.saveVerification({
                id: decoded.userId, verification: {
                    type,
                    identifier,
                    date
                }
            })
            return {identifier, type, date};
        }
    }
}
