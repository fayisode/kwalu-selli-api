import {UseCase} from "../../../../shared/core/UseCase";
import {ResetPasswordDto} from "./reset_password_dto";
import {ResetPasswordResponse} from "./reset_password_response";
import {UserEmail} from "../../domain/value_object/user_email";
import {left, Result, right} from "../../../../shared/core/Result";
import {ResetPasswordError} from "./reset_password_errors";
import {IAuthRepo} from "../../repos/i_auth_repo";
import {MailingService} from "../../services/messaging_service";
import {AppError} from "../../../../shared/core/AppError";
import {ProcessService} from "../../services/process_service";
import {AuthService} from "../../services/auth_service";

export
class ResetPasswordUseCase implements UseCase<ResetPasswordDto, ResetPasswordResponse> {
    private authRepo: IAuthRepo;
    private mailService: MailingService
    private processService: ProcessService
    private authService: AuthService;
    constructor(authRepo: IAuthRepo, mailService: MailingService, processService:
        ProcessService, authService: AuthService) {
        this.authRepo = authRepo;
        this.mailService = mailService;
        this.processService = processService;
        this.authService = authService;
    }

    async execute(request?: ResetPasswordDto): Promise<ResetPasswordResponse> {
        try {
            const emailValueObject = UserEmail.create({value: request.email});
            if (emailValueObject.isFailure) {
                return left(new ResetPasswordError.ValuePropsError(emailValueObject));
            }
            const email = emailValueObject.getValue().value;
            let user;
            try{
                user = await this.authRepo.getUserByEmail(email);
            }catch (e) {
                return left(new ResetPasswordError.EmailDoesNotExist(email));
            }

            try {
                let {otp, info, identifier, operation} = await generateProcessInfo.call(this, email);
                initiateResetPasswordEvent(user, otp, info, identifier, operation);
                await this.mailService.dispatchEventNotification(user.id);
                const message = `Email successfully sent to ${email}`;
                return right(Result.ok<any>(
                    {
                        token: this.getToken(email, user),
                        identifier: identifier,
                        message: message,
                        operation: operation
                    }
                ));
            } catch (e) {
                console.log(e)
                return left(new ResetPasswordError.MailServiceFailed(email));
            }
        } catch (e) {
            return left(
                new AppError.UnexpectedError(e),
            );
        }
        async function generateProcessInfo(email: string) {
            let otp = this.processService.generateOtp();
            const info = await this.mailService.sendMailToUser(email, `${otp}`);
            const identifier = this.processService.generateIdentifier();
            const operation = {
                process_name: 'reset_password',
                type: 'email',
                time: new Date().toISOString(),
            };
            return {otp, info, identifier, operation};
        }

        function initiateResetPasswordEvent(user, otp, info, identifier, operation) {
            user.passwordReset(`${otp}`, {
                ...info,
                identifier,
                operation
            });
        }
    }

    private getToken(email: string, user) {
        return this.authService.signJWT({email: email, userId: user.id.toValue()});
    }
}
