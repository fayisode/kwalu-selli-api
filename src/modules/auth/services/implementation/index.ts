import {JWTAuthService} from "./jwt_auth_service";
import {DefaultProcessService} from "./default_process_service";
import {authRepo} from "../../repos/implementation";

const jwt = require('jsonwebtoken');
const jwtAuthService = new JWTAuthService(jwt);
const processService = new DefaultProcessService(authRepo);
export {
    jwtAuthService,
    processService
}