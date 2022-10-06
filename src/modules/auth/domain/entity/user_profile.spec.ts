import {UserProfile} from "./user_profile";
import {UserEmail, UserName, UserNationalId, UserPhoneNumber} from "../value_object/value_object";
import {Result} from "../../../../shared/core/Result";
import {UniqueEntityID} from "../../../../shared/domain/UniqueEntityID";

describe('User Profile', function () {
    let result: Result<UserProfile>
    beforeEach(()=> {
        result = null;
    })
    test('know a valid user profile is created', () => {
        result = UserProfile.create({
            firstName: UserName.create({value: 'test'}),
            lastName: UserName.create({value: 'test'}),
            avatar: 'test',
            location: 'test',
            phone: UserPhoneNumber.create({value: '78876778'}),
            email: UserEmail.create({value: 'test@test.com'}),
            nationalId: UserNationalId.create({value: '1234567890123'})
        })
        expect(result.isSuccess).toBe(true)
        expect(result.getValue().props.createdDate).not.toBeNull()
        expect(result.getValue().props.updatedDate).not.toBeNull()
        result = UserProfile.create({
            firstName: UserName.create({value: 'test'}),
            lastName: UserName.create({value: 'test'}),
            avatar: '',
            location: '',
            phone: UserPhoneNumber.create({value: '78876778'}),
            email: UserEmail.create({value: 'test@test.com'}),
            nationalId: UserNationalId.create({value: '1234567890123'})
        }, new UniqueEntityID('testid'))
        expect(result.isSuccess).toBe(true)
        expect(result.getValue().props.createdDate).toBeUndefined()
        expect(result.getValue().props.updatedDate).toBeUndefined()
    })

    test('know a invalid user profile is not created', () => {
        result = UserProfile.create({
            firstName: UserName.create({value: 'testQuidem voluptatibus qui libero consequatur molestiae vel adipisci. Et suscipit id. Reprehenderit consequatur beatae corrupti est ullam. Neque velit placeat qui voluptas sit accusantium.'}),
            lastName: UserName.create({value: 'test'}),
            avatar: 'test',
            location: 'test',
            phone: UserPhoneNumber.create({value: '78876778'}),
            email: UserEmail.create({value: 'test@test.com'}),
            nationalId: UserNationalId.create({value: '1234567890123'})
        })
        expect(result.isFailure).toBe(true)
        result = UserProfile.create({
            firstName: UserName.create({value: 'test'}),
            lastName: UserName.create({value: 'te'}),
            avatar: 'test',
            location: 'test',
            phone: UserPhoneNumber.create({value: '7888'}),
            email: UserEmail.create({value: 'test@test.com'}),
            nationalId: UserNationalId.create({value: '1234567890123'})
        })
        expect(result.isFailure).toBe(true)
        result = UserProfile.create({
            firstName: UserName.create({value: 'test'}),
            lastName: UserName.create({value: 'test'}),
            avatar: 'test',
            location: 'test',
            phone: UserPhoneNumber.create({value: '78876778'}),
            email: UserEmail.create({value: 'test'}),
            nationalId: UserNationalId.create({value: '1234567890123'})
        })
        expect(result.isFailure).toBe(true)
        result = UserProfile.create({
            firstName: UserName.create({value: 'test'}),
            lastName: UserName.create({value: 'test'}),
            avatar: 'test',
            location: 'test',
            phone: UserPhoneNumber.create({value: '78876778'}),
            email: UserEmail.create({value: 'test@test.com'}),
            nationalId: UserNationalId.create({value: '1234'})
        })
        expect(result.isFailure).toBe(true)
    })
});