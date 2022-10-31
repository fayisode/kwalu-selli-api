import {UserProfile} from "../domain/entity/user_profile";
import {Mapper} from "../../../shared/infra/Mapper";
import {UniqueEntityID} from "../../../shared/domain/UniqueEntityID";
import {UserEmail, UserName, UserNationalId, UserPassword, UserPhoneNumber} from "../domain/value_object/value_object";

export class UserProfileMap implements Mapper<UserProfile> {
    public static toDomain(raw: any): UserProfile {
        const userProfileOrError = UserProfile.create({
            email: UserEmail.create({value: raw.email}),
            firstName: UserName.create({value: raw.firstName}),
            lastName: UserName.create({value: raw.lastName}),
            avatar: raw.avatar,
            phone: UserPhoneNumber.create({value: raw.phone}),
            location: raw.location,
            nationalId: UserNationalId.create({value: raw.nationalId}),
        }, new UniqueEntityID(raw.profileId));

        userProfileOrError.isFailure ? console.log(userProfileOrError.getErrorValue()) : '';

        return userProfileOrError.isSuccess ? userProfileOrError.getValue() : null;
    }

    public static toPersistence(userProfile: UserProfile): any {
        return {
            profileId: userProfile.id.toValue(),
            email: userProfile.email.value,
            firstName: userProfile.firstName.value,
            lastName: userProfile.lastName.value,
            avatar: userProfile.avatar,
            phone: userProfile.phone.value,
            location: userProfile.location,
            nationalId: userProfile.nationalId.value,
        }
    }
}