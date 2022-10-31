import {UserProfileMap} from "./user_profile_map";
import {UserProfile} from "../domain/entity/user_profile";
import {UserEmail, UserName, UserNationalId, UserPhoneNumber} from "../domain/value_object/value_object";
import {UniqueEntityID} from "../../../shared/domain/UniqueEntityID";

describe('User Profile Map', function () {
    describe('To Domain', function () {
        test('should get a domain from persistent', function () {
            const result = UserProfileMap.toDomain(userProfilePersistent);
            expect(result).toStrictEqual(userProfileDomain);
        })
        test('should get a null or undefined if it failed', function () {
            const result = UserProfileMap.toDomain({});
            expect(result).toBeNull();
        })
    });

    describe('To Persistence', function () {
        test('should get a persistence from domain', function () {
            const result = UserProfileMap.toPersistence(userProfileDomain);
            expect(result).toStrictEqual(userProfilePersistent);
        })
    })

});


let userProfilePersistent = {
    firstName: 'Test',
    lastName: 'Test',
    avatar: 'test',
    location: 'test',
    phone: '78876778',
    email: 'test@test.com',
    nationalId: '1234567890123',
    profileId: 'testid'
};

let userProfileDomain = UserProfile.create({
    firstName: UserName.create({value: userProfilePersistent.firstName}),
    lastName: UserName.create({value: userProfilePersistent.lastName}),
    avatar: userProfilePersistent.avatar,
    location: userProfilePersistent.location,
    phone: UserPhoneNumber.create({value: userProfilePersistent.phone}),
    email: UserEmail.create({value: userProfilePersistent.email}),
    nationalId: UserNationalId.create({value: userProfilePersistent.nationalId})
}, new UniqueEntityID(userProfilePersistent.profileId)).getValue();

