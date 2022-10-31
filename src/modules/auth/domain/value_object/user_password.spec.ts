import {UserPassword} from "./user_password";

describe('UserPassword', function () {
    test('know a user input is a valid user password', ()=> {
        const password = UserPassword.create(passwordProps);
        expect(password.isSuccess).toBeTruthy()
        expect(password.getValue().value).toBe(passwordProps.value)
    })

    test('know a user input is a invalid user password', ()=> {
      const password = UserPassword.create(failedBelowRequiredProps);
      expect(password.isSuccess).toBeFalsy()
        const password2 = UserPassword.create(failedAboveRequireProps);
        expect(password2.isSuccess).toBeFalsy()
    })
});

let passwordProps = {value: 'testpassword', hashed: false}
let failedBelowRequiredProps = {value: 't', hashed: false}
let failedAboveRequireProps = {value:'Unde velit sed deleniti sit ut. Qui repellat vero dolores hic omnis. Non maxime dolor voluptatum qui sunt.', hashed: false}
