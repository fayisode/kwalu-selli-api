import {AuthServiceImpl} from "./index";

describe('Auth Service Impl', function () {
    let service: AuthServiceImpl;
    let jwt:any;
    beforeEach(() => {
        jwt = new JwtMock();
        service = new AuthServiceImpl(jwt);
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
            email: 'test@test.com',
            userId: '123213',
        });
    })

    it('given a JWTClaims, an encoded JWT token to be returned', function () {
        const jwtClaims = {
            email: 'test@test.com',
            userId: '123213',
        }

        expect(service.signJWT(jwtClaims)).toBe('dGVzdA==');
    });
});

 class JwtMock{
    public verify(token:string, secret:string, callback:Function) {
       return  {
            email: 'test@test.com',
            userId: '123213',
        }
    };

    public sign(claims:any, secret:string, options:any) {
        return 'test';
    }
}