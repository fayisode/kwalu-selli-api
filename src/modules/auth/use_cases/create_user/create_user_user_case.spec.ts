import {CreateUserUseCase} from "./create_user_use_case";
import {IAuthRepo} from "../../repos/i_auth_repo";
import {ProductUser} from "../../domain/entity/product_user";
import {UserProfile} from "../../domain/entity/user_profile";
import {CreateUserResponse} from "./create_user_response";
import {before} from "lodash";
import {JwtMock, JwtMockError, TextAuthRepo, TextRepo2} from "../auth_test_helper";

describe('Create User Use Case', function () {
    let result: CreateUserResponse
    let userUseCase: CreateUserUseCase
    let userUseCaseSuccess: CreateUserUseCase
    let jwt: any
    let jwtError: any
    beforeEach(() => {
        result = null;
        jwt = new JwtMock();
        jwtError = new JwtMockError();
        userUseCase = new CreateUserUseCase(new TextAuthRepo(), jwt)
        userUseCaseSuccess = new CreateUserUseCase(new TextRepo2(), jwtError)
    })
    it('should know an invalid props passed', async function () {
        result = await userUseCase.execute({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phone: '',
            nationalId: '',
            location: ''
        });

        expect(result.value.isFailure).toBeTruthy()

        result = await userUseCase.execute({
            email: 'test@test.com',
            password: 'testpassword',
            firstName: 'test',
            lastName: '',
            phone: '',
            nationalId: '',
            location: ''
        });

        expect(result.value.isFailure).toBeTruthy()
    });

    it('know a user already exist', async () => {
            result = await userUseCase.execute({
                email: 'test@test.com',
                password: 'testpassword',
                firstName: '',
                lastName: '',
                phone: '',
                nationalId: '',
                location: ''
            });

            expect(result.value.isFailure).toBeTruthy()


        }
    )

    it('error detected in JWT_ return a left response', async () => {
        result = await userUseCase.execute({
            email: 'test@test.com',
            password: 'testpassword',
            firstName: 'test',
            lastName: 'test',
            phone: '78667655',
            nationalId: '1234567864211',
            location: ''
        })

        expect(result.value.isFailure).toBeTruthy()
    })
    it('should create a user', async () => {
        await jwt.signJWT({
            email: 'test@test.com',
            userId: 'test',
        });
        result = await userUseCaseSuccess.execute({
            email: 'test@test.com',
            password: 'testpassword',
            firstName: 'test',
            lastName: 'test',
            phone: '78667655',
            nationalId: '1234567864211',
            location: ''
        })

        expect(result.value.isSuccess).toBeTruthy()
    })
})
