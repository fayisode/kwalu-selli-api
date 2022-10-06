import {CreateUserUseCase} from "./create_user_use_case";
import {IAuthRepo} from "../../repos/i_auth_repo";
import {ProductUser} from "../../domain/entity/product_user";
import {UserProfile} from "../../domain/entity/user_profile";
import {CreateUserResponse} from "./create_user_response";
import {before} from "lodash";

describe('Create User Use Case', function () {
    let result: CreateUserResponse
    let userUseCase: CreateUserUseCase
    let userUseCaseSuccess: CreateUserUseCase
    beforeEach(() => {
        result = null;
        userUseCase = new CreateUserUseCase(new TextRepo())
        userUseCaseSuccess = new CreateUserUseCase(new TextRepo2())
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

    it('should create a user', async () => {
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

class TextRepo implements IAuthRepo {
    async exists(email: string): Promise<boolean> {
        return true;
    }

    getProfileByEmail(email: string): Promise<UserProfile> {
        return Promise.resolve(undefined);
    }

    getUserByEmail(email: string): Promise<ProductUser> {
        return Promise.resolve(undefined);
    }

    saveProfile(profile: UserProfile): Promise<void> {
        return Promise.resolve(undefined);
    }

    saveUser(user: ProductUser): Promise<void> {
        return Promise.resolve(undefined);
    }
}

class TextRepo2 implements IAuthRepo {
    async exists(email: string): Promise<boolean> {
        return false;
    }

    async save(user: ProductUser): Promise<void> {
    }

    getProfileByEmail(email: string): Promise<UserProfile> {
        return Promise.resolve(undefined);
    }

    getUserByEmail(email: string): Promise<ProductUser> {
        return Promise.resolve(undefined);
    }

    saveProfile(profile: UserProfile): Promise<void> {
        return Promise.resolve(undefined);
    }

    saveUser(user: ProductUser): Promise<void> {
        return Promise.resolve(undefined);
    }
}