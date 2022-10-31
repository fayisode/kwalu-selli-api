import {JWTClaims, JWTToken} from "../domain/helper/jwt";

export interface AuthService {
    signJWT(props: JWTClaims): JWTToken;
    decodeJWT(token: string): Promise<JWTClaims>
    encodeToken(token:string): string;
    decodeToken(token:string): string;
}