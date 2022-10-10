import {JWTAuthService} from "./jwt_auth_service";

const jwt = require('jsonwebtoken');
const jwtAuthService = new JWTAuthService(jwt);

export {
    jwtAuthService
}