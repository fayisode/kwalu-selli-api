import {UserNationalId} from "./user_national_id";
import {Result} from "../../../../shared/core/Result";
import {GuardResponse} from "../../../../shared/core/Guard";

describe('User National Identity Number', function () {
    let result: Result<UserNationalId>;

    beforeEach(() => {
        result = null;
    });

    test('know a user input is a valid national identity number', ()=> {
        result = UserNationalId.create(userIdProps);
        expect(result.isSuccess).toBeTruthy()
        expect(result.getValue().value).toBe(userIdProps.id)
    })

    test('know a user input is a invalid national identity number', ()=> {
      result = UserNationalId.create(failedAboveRequireProps);
        expect(result.isSuccess).toBeFalsy()
        result = UserNationalId.create(failedBelowRequiredProps);
        expect(result.isSuccess).toBeFalsy()
        result = UserNationalId.create(failedContainsNonNumericProps);
        expect(result.isSuccess).toBeFalsy()
        result = UserNationalId.create(failedContainsNonNumericProps2);
        expect(result.isSuccess).toBeFalsy()
        result = UserNationalId.create(failedContainsNonNumericProps3);
        expect(result.isSuccess).toBeFalsy()
    })
});

let userIdProps = {id: '1234567890123'}
let failedBelowRequiredProps = {id: '123456789'}
let failedAboveRequireProps = {id:'12345678901234567890'}
let failedContainsNonNumericProps = {id:'123456789012a'}
let failedContainsNonNumericProps2 = {id:'123456789012&'}
let failedContainsNonNumericProps3 = {id:'123456789012A'}