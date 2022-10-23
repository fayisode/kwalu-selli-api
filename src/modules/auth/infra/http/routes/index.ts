import {Router} from "express";
import {createUserController} from "../../../use_cases/create_user";
import {loginUserController} from "../../../use_cases/login_user";

const authRoute = Router();

authRoute.put("/signup", (req, res) =>
    createUserController.execute(req, res))

authRoute.get("/login", (req, res) =>
    loginUserController.execute(req, res))
export {
    authRoute
}