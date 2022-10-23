import {LoginUserResponse} from "./login_user_response";
import {LoginUserUseCase} from "./login__user_use_case";
import {Mock} from "moq.ts";
import {IAuthRepo} from "../../repos/i_auth_repo";
import {ProductUser} from "../../domain/entity/product_user";
import {UserEmail} from "../../domain/value_object/user_email";
import {UserPassword} from "../../domain/value_object/user_password";
import {UniqueEntityID} from "../../../../shared/domain/UniqueEntityID";
import {AuthService} from "../../services/auth_service";
import {JWTToken} from "../../domain/helper/jwt";

describe('Login User UseCase', () => {
    let result: LoginUserResponse
    let userUseCase: LoginUserUseCase
    let mock: any
    let authServiceMock: any

    beforeEach(async () => {
        result = null;
        let userPersistent = {
            userId: '1',
            email: 'test1@test.com',
            password: '123456'
        }

        let userDomain = ProductUser.create(
            {
                email: UserEmail.create({value: userPersistent.email}),
                password: UserPassword.create({value: userPersistent.password, hashed: true})
            },
            new UniqueEntityID(userPersistent.userId)).getValue();
        mock = new Mock<IAuthRepo>().setup(async instance =>
            instance.exists('test@test.com')).returnsAsync(true).setup(
            async instance => instance.getUserByEmail('test1@test.com')).returnsAsync(userDomain);

        authServiceMock = new Mock<AuthService>().setup(
            async instance => instance.signJWT({
                email: "test1@test.com",
                userId:"1",
            })
        ).returnsAsync("token" as JWTToken);

        userUseCase = new LoginUserUseCase(mock.object(),authServiceMock.object())
    })

    test('given a non valid object, return a ValuePropsError', async () => {
        result = await userUseCase.execute({
            email: '',
            password: ''
        })
        expect(result.value.isFailure).toBeTruthy()
    })

    test('given a non existing user, return a UserNotExistError', async () => {

        result = await userUseCase.execute({
            email: 'test@test.com',
            password: 'testpassword'
        })

        expect(result.value.isFailure).toBeTruthy()
        expect(result.value.getErrorValue().message).toBe('Email test@test.com does not exist')
    })

    it('given a valid user with incorrect password, return a PasswordNotMatchError', async function () {
        result = await userUseCase.execute({
            email: 'test1@test.com',
            password: 'testpassword'
        })

        expect(result.value.isFailure).toBeTruthy()
        expect(result.value.getErrorValue().message).toBe('Password does not match')
    });

    it('given a valid user email and correct password, return a valid token', async function () {
        result = await userUseCase.execute({
            email: 'test1@test.com',
            password: '123456'
        })
        expect(result.value.isSuccess).toBeTruthy()
    });
});
