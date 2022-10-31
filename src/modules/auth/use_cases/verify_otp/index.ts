import {VerifyOtpUseCase} from "./verify_otp_use_case";
import {jwtAuthService, processService} from "../../services/implementation";
import {authRepo} from "../../repos/implementation";
import {VerifyOtpController} from "./verify_otp_controller";

const verifyOtpUseCase = new VerifyOtpUseCase(jwtAuthService,processService, authRepo)
const verifyOtpController = new VerifyOtpController(verifyOtpUseCase)

export {
    verifyOtpUseCase,
    verifyOtpController
}