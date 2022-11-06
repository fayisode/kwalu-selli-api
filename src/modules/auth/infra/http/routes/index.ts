import {Router} from "express";
import {createUserController} from "../../../use_cases/create_user";
import {loginUserController} from "../../../use_cases/login_user";
import {resetPasswordController} from "../../../use_cases/reset_password";
import {verifyOtpController} from "../../../use_cases/verify_otp";
import {changePasswordController} from "../../../use_cases/change_password";

const authRoute = Router();

authRoute.put("/signup", (req, res) =>
    createUserController.execute(req, res))

authRoute.post("/login", (req, res) =>
    loginUserController.execute(req, res))

authRoute.put('/reset-password', (req, res) =>
    resetPasswordController.execute(req, res))

authRoute.put('/verify-otp', (req, res) =>
    verifyOtpController.execute(req, res))

authRoute.post('/change-password', (req, res) =>
    changePasswordController.execute(req, res))
export {
    authRoute
}