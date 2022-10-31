import {UseCase} from "../../../../shared/core/UseCase";
import {UpdateProfileResponse} from "./update_profile_response";
import {UpdateProfileDto} from "./update_profile_dto";
import {left, Result, right} from "../../../../shared/core/Result";
import {UserProfile} from "../../domain/entity/user_profile";
import {UserEmail} from "../../domain/value_object/user_email";
import {UserName, UserNationalId, UserPhoneNumber} from "../../domain/value_object/value_object";
import {UpdateProfileError} from "./update_profile_error";
import {AppError} from "../../../../shared/core/AppError";
import {IAuthRepo} from "../../repos/i_auth_repo";

export class UpdateProfileUseCase implements UseCase<UpdateProfileDto,
    Promise<UpdateProfileResponse>> {

    private authRepo:IAuthRepo;

    constructor(repo: IAuthRepo) {
        this.authRepo = repo;
    }
    async  execute(request?: UpdateProfileDto): Promise<UpdateProfileResponse> {
        const profileDomain: Result<UserProfile> = UserProfile.create({
            email: UserEmail.create({value: request.email}),
            firstName: UserName.create({value: request.firstName}),
            lastName: UserName.create({value: request.lastName}),
            phone: UserPhoneNumber.create({value: request.phone}),
            nationalId: UserNationalId.create({value: request.nationalId}),
            location: request.location,
            avatar: request.avatar
        });

        if(profileDomain.isFailure){
            return left(new UpdateProfileError.ValuePropsError(profileDomain));
        }

        try {
            await this.authRepo.saveProfile(profileDomain.getValue());
            return right(Result.ok<void>());
        }catch (e) {
            return left(new AppError.UnexpectedError('')) as UpdateProfileResponse;
        }

    }

}