import {Either, left, Result, right} from "../../../../shared/core/Result";
import {AppError} from "../../../../shared/core/AppError";
import {UseCase} from "../../../../shared/core/UseCase";
import {IProductReadRepo} from "../../repos/i_product_read_repo";
import {Mock} from "moq.ts";
import {AuthService} from "../../../auth/services/auth_service";
import {JWTClaims} from "../../../auth/domain/helper/jwt";
import {CreateNewProductError} from "../create_new_product/create_new_product_error";
import {UseCaseError} from "../../../../shared/core/UseCaseError";
import {GetProductUseCaseError} from "./get_product_use_case_error";
import {GetProductDto} from "./get_product_dto";
import {GetProductResponse} from "./get_product_response";
import {GetProductUseCase} from "./get_product_use_case";

describe('Get Product Use Case', () => {
    let result: GetProductResponse
    let useCase: GetProductUseCase

    beforeEach(() => {
        result = null
        useCase = new GetProductUseCase(
            mockProductReadRepo().object(),
            mockAuthService().object()
        )
    })

    it('given an invalid token,should return un authorized error',
        async function () {
            result = await useCase.execute({token: invalidToken})
            expect(result.value.isFailure).toBeTruthy()
        });

    it('when product is unavailable, should return not found error',
        async function () {
            result = await useCase.execute({token: validToken, productId: '1'})
            expect(result.value.isFailure).toBeTruthy()
        })

    it('given a valid token, should return product list', async function () {
        result = await useCase.execute({token: validToken})
        expect(result.value.isSuccess).toBeTruthy()
        // @ts-ignore
        expect(result.value.getValue().data).toStrictEqual(value)
    })

})
const invalidToken = 'invalid token'
const validToken = '123'
const email = 'test@test.com';

const value = {
    'data': 'data'
};

function mockProductReadRepo() {
    return new Mock<IProductReadRepo>().setup(
        repo => repo.read(email)).returnsAsync(value).setup(
        repo => repo.read(email, '1')).returnsAsync({});
}

function mockAuthService() {

    return new Mock<AuthService>().setup(authService =>
        authService.decodeJWT(invalidToken)).throwsAsync(Error('')).setup(
        authService =>
            authService.decodeJWT(validToken)).returnsAsync({
            userId: '1',
            email: email
        }
    )
}
