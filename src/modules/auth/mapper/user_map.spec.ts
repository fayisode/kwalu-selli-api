import {UserMap} from "./user_map";
import {ProductUser} from "../domain/entity/product_user";
import {UserEmail} from "../domain/value_object/user_email";
import {UserPassword} from "../domain/value_object/value_object";
import {UniqueEntityID} from "../../../shared/domain/UniqueEntityID";

describe('User Map', function () {
    describe('To domain', function () {
        it('should get a domain from persistent', function () {
            const result = UserMap.toDomain(userPersistent);
            expect(result).toStrictEqual(userDomain);
        });
    });

    it('should get a persistence from domain', function () {
        const result = UserMap.toPersistence(userDomain);
        expect(result).toStrictEqual(userPersistent);
    });
});

let userPersistent = {
    userId: '1',
    email: 'test@test.com',
    password: '123456'
}

let userDomain = ProductUser.create(
    {
        email: UserEmail.create({value: userPersistent.email}),
        password: UserPassword.create({value: userPersistent.password, hashed: true})
    },
    new UniqueEntityID(userPersistent.userId)).getValue();