import {AuthService} from "../auth_service";
import {JWTClaims, JWTToken} from "../../domain/helper/jwt";
import {valueConfig} from "../../../../config/config";

export class AuthServiceImpl implements  AuthService {
    private jwt:any;
    constructor(jwt:any) {
        this.jwt = jwt;
    }
    decodeJWT(token: string): Promise<JWTClaims> {
        const tokenDecoded= this.decodeToken(token);
        return this.jwt.verify(tokenDecoded, valueConfig.JWT_SECRET);
    }

    decodeToken(token: string): string {
        return atob(token);
    }

    encodeToken(token: string): string {
        return btoa(token);
    }

    signJWT(props: JWTClaims): JWTToken {
        const generatedToken =  this.jwt.sign(props, valueConfig.JWT_SECRET);
        return this.encodeToken(generatedToken);
    }
}