import {UseCase} from "../../../../shared/core/UseCase";
import {LoginUserDto} from "./login_user_dto";
import {LoginUserResponse} from "./login_user_response";
import {IAuthRepo} from "../../repos/i_auth_repo";
import {ProductUser} from "../../domain/entity/product_user";
import {UserEmail} from "../../domain/value_object/user_email";
import {UserPassword} from "../../domain/value_object/user_password";
import {UniqueEntityID} from "../../../../shared/domain/UniqueEntityID";
import {left, Result, right} from "../../../../shared/core/Result";
import {LoginUserError} from "./login_user_error";
import {AppError} from "../../../../shared/core/AppError";
import {AuthService} from "../../services/auth_service";

export class LoginUserUseCase implements UseCase<LoginUserDto, LoginUserResponse> {
    private authRepo: IAuthRepo
    private authService: AuthService;

    constructor(authRepo: IAuthRepo, authService: AuthService) {
        this.authRepo = authRepo;
        this.authService = authService;
    }

    async execute(request?: LoginUserDto): Promise<LoginUserResponse> {
        const userDomain = ProductUser.create({
            email: UserEmail.create({value: request.email}),
            password: UserPassword.create(
                {
                    value: request.password,
                    hashed: false
                }
            )
        }, new UniqueEntityID());

        if (userDomain.isFailure) {
            return left(
                new LoginUserError.ValuePropsError(userDomain),
            );
        }

        async function isUserPasswordMatch(user) {
            return await user.password.getValue().comparePassword(userDomain.getValue().password.getValue().value);
        }

        try {
            const email = userDomain.getValue().email.getValue().value;
            let user;
            try {
                user = await this.authRepo.getUserByEmail(email);

                const isMatch = await isUserPasswordMatch(user);
                if (!isMatch) {
                    return left(new LoginUserError.PasswordDoesNotMatch())
                } else {
                    const email = user.email.getValue().value;
                    const id = user.id.toValue() as string;
                    const token = await this.authService.signJWT({
                        email: email,
                        userId: id,
                    });
                    user.setAccessToken(token);
                    await this.authRepo.signInUser(user);
                    return right(Result.ok({token: token, message: 'User successfully logged in'}))
                }
            } catch (e) {
                return left(
                    new LoginUserError.EmailDoesNotExist(email),
                );
            }
        } catch (e) {
            return left(
                new AppError.UnexpectedError(e),
            );
        }
    }
}