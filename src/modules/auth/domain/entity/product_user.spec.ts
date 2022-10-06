import {ProductUser} from "./product_user";
import {UserEmail} from "../value_object/user_email";
import {UserPassword} from "../value_object/value_object";
import {Result} from "../../../../shared/core/Result";

describe('Product User', function () {
    let result:Result<ProductUser>;
    beforeEach(()=>{
        result = null
    })
    it('should know a valid user details is created', function () {
        result = ProductUser.create({
            email: UserEmail.create({value: 'test@test.com'}),
            password: UserPassword.create({value: 'testpassword'})
        })

        expect(result.isSuccess).toBeTruthy()
    });

    it('should know a invalid user details is created', function () {
        result = ProductUser.create({
            email: UserEmail.create({value: 'test@test.com'}),
            password: UserPassword.create({value: 'test'})
        })

        expect(result.isFailure).toBeTruthy()
        result = ProductUser.create({
            email: UserEmail.create({value: 'test@test'}),
            password: UserPassword.create({value: 'testpassword'})
        })

        expect(result.isFailure).toBeTruthy()
    })

    it('know a new token and last login is set', function () {
        result = ProductUser.create({
            email: UserEmail.create({value: 'test@test.com'}),
            password: UserPassword.create({value: 'testpassword'})
        })

        result.getValue().setAccessToken('testtoken')
        expect(result.getValue().props.lastLogin).not.toBeNull()
        expect(result.getValue().props.accessToken).toBe('testtoken')
    })
});