import {UserName} from "./user_name";
import {Result} from "../../../../shared/core/Result";

describe('UserName', function () {
    let result: Result<UserName>
    beforeEach(
        () => {
            result = null
        }
    )

    test('know a user input is a valid user name', () => {
        result = UserName.create(userProps);
        expect(result.isSuccess).toBeTruthy()
        expect(result.getValue().value).toBe('Test')
    })

    test('know a user input is a invalid user name', () => {
        result = UserName.create(failedAboveRequireProps);
        expect(result.isSuccess).toBeFalsy()
        result = UserName.create(failedAboveRequireProps);
        expect(result.isSuccess).toBeFalsy()
    })
});

let userProps = {name: 'test'}
let failedBelowRequiredProps = {name: 't'}
let failedAboveRequireProps = {
    name: 'Unde velit sed deleniti sit ut. Qui repellat vero dolores hic omnis. Non maxime dolor voluptatum qui sunt.'
}