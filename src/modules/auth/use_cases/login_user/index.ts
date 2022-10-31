import {authRepo} from "../../repos/implementation";
import {jwtAuthService} from "../../services/implementation";
import {LoginUserUseCase} from "./login__user_use_case";
import {LoginUserController} from "./login_user_controller";

const loginUserUseCase = new LoginUserUseCase(authRepo, jwtAuthService);
const loginUserController = new LoginUserController(loginUserUseCase);

export {
    loginUserController,
    loginUserUseCase,
}