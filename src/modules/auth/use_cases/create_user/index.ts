import {CreateUserUseCase} from "./create_user_use_case";
import {CreateUserController} from "./create_user_controller";
import {authRepo} from "../../repos/implementation";
import {jwtAuthService} from "../../services/implementation";

const createUserUseCase = new CreateUserUseCase(authRepo, jwtAuthService)
const createUserController = new CreateUserController(createUserUseCase)

export {
    createUserController,
    createUserUseCase,
}