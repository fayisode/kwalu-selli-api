import {Either, left, Result, right} from "../../../../shared/core/Result";
import {UseCaseError} from "../../../../shared/core/UseCaseError";
import {UseCase} from "../../../../shared/core/UseCase";
import {AuthService} from "../../services/auth_service";
import {Mock} from "moq.ts";
import {JWTClaims} from "../../domain/helper/jwt";
import {OperationValues, ProcessService} from "../../services/process_service";
import {IAuthRepo} from "../../repos/i_auth_repo";
import {AppError} from "../../../../shared/core/AppError";
import {VerifyOtpError} from "./verify_otp_error";
import {VerifyOtpDto} from "./verify_otp_dto";
import {VerifyOtpResponse} from "./verify_otp_response";
import {VerifyOtpUseCase} from "./verify_otp_use_case";

describe('Verify Otp', () => {
    let result: VerifyOtpResponse
    let useCase: VerifyOtpUseCase
    beforeEach(
        () => {
            result = null
            useCase = new VerifyOtpUseCase(
                mockAuthService().object(),
                mockProcessService().object(),
                mockAuthRepo().object())
        }
    )

    it('when token doesnt exist or invalid return InvalidToken Error', async function () {

        result = await useCase.execute({
            token: null, userDetails
        })
        expect(result.value.isFailure).toBe(true)

        result = await useCase.execute({token: undefined, userDetails})
        expect(result.value.isFailure).toBe(true)

        result = await useCase.execute({token: token, userDetails})
        expect(result.value.isFailure).toBe(true)
    });

    it('when a given newIdentifier and operation value are invalid, return an UnAuthorized Error', async function () {
        result = await useCase.execute({token: token1, userDetails})
        expect(result.value.isFailure).toBe(true)
        expect(result.value.getErrorValue().message).toBe(`UnAuthorized Request. Try again later`)

        result = await useCase.execute({token: token1, userDetails: userDetails2})
        expect(result.value.isFailure).toBe(true)
        expect(result.value.getErrorValue().message).toBe(`UnAuthorized Request. Try again later`)

    })

    it('when a given newIdentifier and operation value are valid', async function () {
        result = await useCase.execute({token: token1, userDetails: userDetailsValid})
        expect(result.value.isSuccess).toBe(true)
    })

})
const userDetails = {
    process_name: '',
    otp: '',
    identifier: '',
    time: new Date(),
    type: ''
};

const userDetails2 = {
    process_name: '',
    otp: '',
    identifier: '',
    time: new Date(),
    type: ''
};
const userDetailsValid = {
    process_name: 'reset_password',
    otp: '1231',
    identifier: '899001029990102',
    time: new Date(),
    type: 'email'
};
const token = 'aaaaa';
const token1 = '123jjsjsj1323';
const newIdentifier = '899001029990102';

function mockAuthService() {

    return new Mock<AuthService>().setup(service => service.decodeJWT(token1)).returnsAsync({
        userId: '1',
        email: 'test@test.com'
    }).setup(service => service.decodeJWT(token)).throwsAsync(new Error('Invalid Token'))
}

function mockProcessService() {
    return new Mock<ProcessService>().setup(
        service => service.checkOperationValid('1',
            userDetails)).throwsAsync(
        new Error('Invalid Identifier')).setup(
        service => service.checkOperationValid('1',
            userDetails2)).returnsAsync(false).setup(
        service => service.checkOperationValid('1',
            userDetailsValid)).returnsAsync(true).setup(
        service => service.generateIdentifier()).returns(newIdentifier)
}

function mockAuthRepo() {
    return new Mock<IAuthRepo>().setup(repo => repo.saveVerification({
        id: '1', verification: {
            type: 'email',
            identifier: newIdentifier,
            date: new Date()
        }
    })).returnsAsync()
}




