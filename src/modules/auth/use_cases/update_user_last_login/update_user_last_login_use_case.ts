import {UseCase} from "../../../../shared/core/UseCase";
import {UpdateUserLastLoginDto} from "./update_user_last_login_dto";
import {UpdateUserLastLoginResponse} from "./update_user_last_login_response";
import {IAuthRepo} from "../../repos/i_auth_repo";
import {left, Result, right} from "../../../../shared/core/Result";
import {AppError} from "../../../../shared/core/AppError";
import {UpdateProfileResponse} from "../update_profile/update_profile_response";

export class UpdateUserLastLoginUseCase implements UseCase<UpdateUserLastLoginDto, Promise<UpdateUserLastLoginResponse>> {
    private authRepo: IAuthRepo;

    constructor(authRepo: IAuthRepo) {
        this.authRepo = authRepo
    }

    async execute(request?: UpdateUserLastLoginDto): Promise<UpdateUserLastLoginResponse> {
        try{
            await this.authRepo.updateUserLastLogin(request.userId, request.date);
            return right(Result.ok<void>());
        }catch (e) {
            return left(new AppError.UnexpectedError('')) as UpdateProfileResponse;
        }
    }
}