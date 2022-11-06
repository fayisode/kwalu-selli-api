import {UseCase} from "../../../../shared/core/UseCase";
import { left, Result, right} from "../../../../shared/core/Result";
import {UserPassword} from "../../domain/value_object/value_object";
import {AuthService} from "../../services/auth_service";
import {ProcessService} from "../../services/process_service";
import {JWTClaims} from "../../domain/helper/jwt";
import {IAuthRepo} from "../../repos/i_auth_repo";
import {AppError} from "../../../../shared/core/AppError";
import {ChangePasswordError} from "./change_password_error";
import {ChangePasswordResponse} from "./change_password_response";
import {ChangePasswordDto} from "./change_password_dto";

export class ChangePasswordUseCase implements UseCase<ChangePasswordDto, ChangePasswordResponse> {
    private authServices: AuthService
    private processService: ProcessService;
    private authRepo: IAuthRepo;

    constructor(authServices: AuthService,
                processService: ProcessService,
                authRepo: IAuthRepo) {
        this.authServices = authServices
        this.processService = processService
        this.authRepo = authRepo
    }


    async execute(request?: ChangePasswordDto): Promise<ChangePasswordResponse> {
        const passwordResult = UserPassword.create({value: request.newPassword, hashed: false});
        if (passwordResult.isFailure) {
            return left(new ChangePasswordError.InvalidPassword());
        }

        let decoded: JWTClaims
        try {
            decoded = await this.authServices.decodeJWT(request.token);
        } catch (e) {
            return left(new ChangePasswordError.UnAuthorizedAccess());
        }

        try {
            let usersDetails = await this.processService.checkResetOperation(
                decoded.userId,
                request.userDetails);
            if (!usersDetails) {
                return left(new ChangePasswordError.IncompleteRequest());
            }
        } catch (e) {
            return left(new ChangePasswordError.IncompleteRequest());
        }


        try {
            const hashedValue = await passwordResult.getValue().getHashedValue();
            await this.authRepo.updateUser(decoded.userId,
                {password: hashedValue});
            return right(Result.ok({
                token: request.token,
                message: "Password changed successfully"
            }));
        } catch (e) {
            return left(
                new AppError.UnexpectedError(e),
            );
        }
    }
}


