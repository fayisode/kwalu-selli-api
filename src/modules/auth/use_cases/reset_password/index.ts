import {ResetPasswordUseCase} from "./reset_password_use_case";
import {authRepo} from "../../repos/implementation";
import {MailingService} from "../../services/messaging_service";
import {ResetPasswordController} from "./reset_password_controller";
import {jwtAuthService, processService} from "../../services/implementation";

const resetPasswordUseCase = new ResetPasswordUseCase(authRepo, new MailingService(),
    processService, jwtAuthService);
const resetPasswordController = new ResetPasswordController(resetPasswordUseCase);

export {
    resetPasswordController,
    resetPasswordUseCase,
}