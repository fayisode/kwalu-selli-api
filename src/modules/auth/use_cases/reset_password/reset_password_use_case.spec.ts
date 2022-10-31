import {ResetPasswordResponse} from "./reset_password_response";
import {UseCase} from "../../../../shared/core/UseCase";
import {ResetPasswordDto} from "./reset_password_dto";
import {left, Result, right} from "../../../../shared/core/Result";
import {ResetPasswordError} from "./reset_password_errors";
import {IAuthRepo} from "../../repos/i_auth_repo";
import {Mock} from "moq.ts";
import {MailingService} from "../../services/messaging_service";
import {AppError} from "../../../../shared/core/AppError";
import {ResetPasswordUseCase} from "./reset_password_use_case";
import {ProductUser} from "../../domain/entity/product_user";
import {UserEmail} from "../../domain/value_object/user_email";
import {UserPassword} from "../../domain/value_object/user_password";
import {UniqueEntityID} from "../../../../shared/domain/UniqueEntityID";
import {ProcessService} from "../../services/process_service";
import {AuthService} from "../../services/auth_service";


describe('Reset Password UseCase', () => {
    let result: ResetPasswordResponse
    let useCase: ResetPasswordUseCase

    beforeEach(() => {
        result = null;
        useCase = new ResetPasswordUseCase(mockAuthRepo().object(),
            mockMailService().object(),
            mockProcessService().object(),
            mockAuthService().object(),
            );
    })

    it('given an invalid email, return a value props error', async function () {
        const invalidEmail = 'test@';
        result = await useCase.execute({email: invalidEmail})
        expect(result.value.isFailure).toBe(true)
        expect(result.value.getErrorValue().message).toBe(`Value props error: email is not a valid email`)
    });

    it('when user email does not exit, return email does not exist error', async function () {

        result = await useCase.execute({email: email})
        expect(result.value.isFailure).toBe(true)
        expect(result.value.getErrorValue().message).toBe(`Email ${email} does not exist`)
    });

    it('when mail service fails, return a mail service error', async function () {
        result = await useCase.execute({email: email2})
        expect(result.value.isFailure).toBe(true)
        expect(result.value.getErrorValue().message).toBe(`Error sending mail to test1@test.com`)
    })

    it('when mail service succeeds, return a success result', async function () {
        result = await useCase.execute({email: email3})
        expect(result.value.isSuccess).toBe(true)
        expect(result.value.getValue()).toBeDefined()
    })
})

const email = 'test@test.com'
const email2 = `test1@test.com`
const email3 = `test3@test.com`
let userPersistent = {
    userId: '1',
    email: email3,
    password: '123456'
}

let userDomain = ProductUser.create(
    {
        email: UserEmail.create({value: userPersistent.email}),
        password: UserPassword.create({value: userPersistent.password, hashed: true})
    },
    new UniqueEntityID(userPersistent.userId)).getValue();


function mockAuthRepo() {
    return new Mock<IAuthRepo>().setup(repo => repo.getUserByEmail(email)).throwsAsync(Error('')).setup(repo => repo.getUserByEmail(email2)).returnsAsync(userDomain).setup(repo => repo.getUserByEmail(email3)).returnsAsync(userDomain)
}

function mockMailService() {
    return new Mock<MailingService>().setup(mail =>
        mail.sendMailToUser(email2, '1232')).throwsAsync(
        new Error('Mail service error')).setup(mail =>
        mail.sendMailToUser(email3, '1232')).returnsAsync(
        true).setup(mail =>
        mail.dispatchEventNotification(new UniqueEntityID('1'))).returnsAsync()
}

function mockProcessService() {
    return new Mock<ProcessService>().setup(
        process =>
            process.generateOtp()).returns('1232').setup(
        process =>
            process.generateIdentifier()).returns('1232')
}

function mockAuthService() {
    return new Mock<AuthService>().setup(auth => auth.signJWT({
        userId: '1',
        email: email3
    })).returns('1232')
}