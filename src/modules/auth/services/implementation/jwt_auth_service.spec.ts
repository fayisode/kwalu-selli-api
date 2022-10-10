import {JWTAuthService} from "./jwt_auth_service";
import {JwtMock} from "../../use_cases/auth_test_helper";

describe('Auth Service Impl', function () {
    let service: JWTAuthService;
    let jwt:any;
    beforeEach(() => {
        jwt = new JwtMock();
        service = new JWTAuthService(jwt);
    })
    it('given a string value, check for encode the decoded value', function () {
        const value = 'test';
        const encodedValue = service.decodeToken(value);
        const decodedValue = service.encodeToken(encodedValue);
        expect(value).toBe(decodedValue);
    });


    it('given encoded token, return the JWT Claims', ()=>{
        const decodedJwt = service.decodeJWT('test');
        expect(decodedJwt).toStrictEqual({
            email: email,
            userId: '123213',
        });
    })

    it('given a JWTClaims, an encoded JWT token to be returned', function () {
        const jwtClaims = {
            email: email,
            userId: userId,
        }

        expect(service.signJWT(jwtClaims)).toBe('dGVzdA==');
    });
});
const email = 'test@test.com';
const userId = '123213';
