import {Result} from "../../../../shared/core/Result";
import {UserPhoneNumber} from "./user_phone_number";

describe('UserPhoneNumber', function () {
    let result: Result<UserPhoneNumber>;
    beforeEach(()=>{
        result = null
    })

    it('should create a valid user phone number', function () {
      result = UserPhoneNumber.create({value: '76678880'});
        expect(result.isSuccess).toBeTruthy();
        expect(result.getValue().value).toBe('76678880')
    })

    it('should create a invalid user phone number', function () {
      result = UserPhoneNumber.create({value: '1234567891'});
        expect(result.isSuccess).toBeFalsy();
        result = UserPhoneNumber.create({value: '1234567'});
        expect(result.isSuccess).toBeFalsy();
        result = UserPhoneNumber.create({value: 'testtest'});
        expect(result.isSuccess).toBeFalsy();
    })
});