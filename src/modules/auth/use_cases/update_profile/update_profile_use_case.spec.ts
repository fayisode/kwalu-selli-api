
import {UpdateProfileResponse} from "./update_profile_response";
import {UpdateProfileUseCase} from "./update_profile_use_case";
import {AppError} from "../../../../shared/core/AppError";
import {TextAuthRepo, TextRepo2, TextRepo3} from "../auth_test_helper";

describe('Update Profile', function () {
    let result: UpdateProfileResponse
    let userUseCase: UpdateProfileUseCase
    let userUseCaseSuccess: UpdateProfileUseCase
    let throwErrorUseCase: UpdateProfileUseCase

    beforeEach(() => {
        result = null;
        userUseCase = new UpdateProfileUseCase(new TextAuthRepo());
        userUseCaseSuccess = new UpdateProfileUseCase(new TextRepo2());
        throwErrorUseCase = new UpdateProfileUseCase(new TextRepo3())
    })

    it('user input not valid _ return UpdateUserError (value props error) ', async () => {
        result = await userUseCase.execute({
            email: '',
            firstName: 'test',
            lastName: 'test',
            phone: 'test',
            nationalId: 'test',
            location: 'test',
            avatar: 'test'
        });
        expect(result.value.isFailure).toBe(true);
    })

    it('repo action throws error _ return an instance of AppError (unexpected error)', async function () {
        result = await throwErrorUseCase.execute(validRequestParameter);
        expect(result.value).toStrictEqual(new AppError.UnexpectedError(''));
    });

    it('repo action success _ return an instance of UpdateProfileResponse (success)', async function () {
        result = await userUseCase.execute(validRequestParameter);
        expect(result.value.isSuccess).toBe(true);
    })
});

const validRequestParameter = {
    email: 'test@test.com',
    firstName: 'test',
    lastName: 'test',
    phone: '76675550',
    nationalId: '1234567890123',
    location: 'test',
    avatar: 'test'
};