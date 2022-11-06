import {ChangePasswordUseCase} from "./change_passsword_usecase";
import {jwtAuthService, processService} from "../../services/implementation";
import {authRepo} from "../../repos/implementation";
import {ChangePasswordController} from "./change_password_controller";


const changePasswordUseCase = new ChangePasswordUseCase(jwtAuthService, processService, authRepo);
const changePasswordController = new ChangePasswordController(changePasswordUseCase);
export {
    changePasswordController
}

