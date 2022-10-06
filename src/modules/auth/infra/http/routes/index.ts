import {Router} from "express";
import {createUserController} from "../../../use_cases/create_user";

const authRoute = Router();

authRoute.put("/signup", (req, res) =>
    createUserController.execute(req, res))

export {
    authRoute
}