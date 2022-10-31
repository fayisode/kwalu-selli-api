import {UpdateUserLastLoginResponse} from "./update_user_last_login_response";
import {UpdateUserLastLoginUseCase} from "./update_user_last_login_use_case";
import {IAuthRepo} from "../../repos/i_auth_repo";
import {Mock} from "moq.ts";

describe('Update User last login', function () {
    let result: UpdateUserLastLoginResponse;
    let useCase: UpdateUserLastLoginUseCase;
    let mock: any
    let dateTime: Date
    beforeEach(function () {
        dateTime = new Date();
        result = null;
        mock = new Mock<IAuthRepo>().setup(async instance =>
            instance.updateUserLastLogin('123', dateTime)).returnsAsync().setup(
            async instance =>
                instance.updateUserLastLogin('1234554', dateTime)).throwsAsync(new Error('error'));
        useCase = new UpdateUserLastLoginUseCase(mock.object());
    })

    it('given an id update the user record', async function () {
        result = await useCase.execute({userId: '123', date: dateTime});
        expect(result.value.isSuccess).toBe(true);
    });

    it('should the datasource failed, return an app error', async function () {
        result = await useCase.execute({userId: '1234554', date: dateTime});
        expect(result.value.isFailure).toBe(true);
    });
});