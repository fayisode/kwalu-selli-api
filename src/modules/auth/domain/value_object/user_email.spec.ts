import {Result} from "../../../../shared/core/Result";
import {UserEmail} from "./user_email";

describe('User email', function () {
    let result: Result<UserEmail>;
    beforeEach(() => {
        result = null
    })

    it('should create a valid user email', function () {
        result = UserEmail.create({value: 'test@test.com'});
        expect(result.isSuccess).toBeTruthy();
        expect(result.getValue().value).toBe('test@test.com')
    })

    it('should create a invalid user email', function () {
        result = UserEmail.create({value: 'test'});
        expect(result.isSuccess).toBeFalsy();
        result = UserEmail.create({value: 'test@test'});
        expect(result.isSuccess).toBeFalsy();
    })
});