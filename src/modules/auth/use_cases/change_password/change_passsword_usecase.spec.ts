import {Mock} from "moq.ts";
import {AuthService} from "../../services/auth_service";
import {ProcessService} from "../../services/process_service";
import {IAuthRepo} from "../../repos/i_auth_repo";
import {ChangePasswordUseCase} from "./change_passsword_usecase";
import {ChangePasswordResponse} from "./change_password_response";

describe(
    'ChangePasswordUseCase', () => {
        let changePasswordUse: ChangePasswordUseCase;
        let result: ChangePasswordResponse;

        beforeAll(async () => {
            changePasswordUse = new ChangePasswordUseCase(
                mockAuthService().object(),
                mockProcessService().object(),
                mockAuthRepo().object());
        })

        it('given an invalid password return an InvalidPassword Error',
            async function () {
                result = await changePasswordUse.execute({
                    newPassword: '123',
                    token: '123',
                    userDetails: invalidUsersDetails
                });
                expect(result.value.getErrorValue().message).toEqual(
                    'Invalid Password');
                expect(result.value.isFailure).toBeTruthy()
            });

        it('given an invalid token return an unauthorized error',
            async function () {
                result = await changePasswordUse.execute({
                    newPassword: '12345656',
                    token: token,
                    userDetails: invalidUsersDetails
                });
                expect(result.value.isFailure).toBeTruthy()
            })

        it('given an invalid identifier and values return incomplete request',
            async function () {
                result = await changePasswordUse.execute({
                    newPassword: '12345656',
                    token: validToken,
                    userDetails: invalidUsersDetails
                });
                expect(result.value.isFailure).toBeTruthy()
            })

        it('given a valid token and password return a success response',
            async function () {
                result = await changePasswordUse.execute({
                    newPassword: '12345656',
                    token: validToken,
                    userDetails: validUsersDetails
                });
                expect(result.value.isSuccess).toBeTruthy()
            })
    }
)
const invalidUsersDetails = {
    identifier: '123',
    type: '123',
    date: '123'
}
const validUsersDetails = {
    identifier: '123',
    type: 'email',
    date: '2020-12-12'
}
const token = '123456';
const validToken = '12345878';
const userId = '123';
const email = 'test@test.com';

function mockAuthService() {
    return new Mock<AuthService>().setup(service =>
        service.decodeJWT(token)).throwsAsync(Error(''))
        .setup(service =>
            service.decodeJWT(validToken)).returnsAsync(
            {
                userId: userId,
                email: email
            }
        )
}

function mockProcessService() {
    return new Mock<ProcessService>().setup(service =>
        service.checkResetOperation(userId,
            invalidUsersDetails)).throwsAsync(Error('')).setup(service =>
        service.checkResetOperation(userId,
            validUsersDetails)).returnsAsync(true)
}

function mockAuthRepo() {
    return new Mock<IAuthRepo>().setup(repo =>
        repo.updateUser('123',
            {password: '12345656'})).returnsAsync()
}