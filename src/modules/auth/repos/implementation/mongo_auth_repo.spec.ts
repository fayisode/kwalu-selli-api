import {ProductUser} from "../../domain/entity/product_user";
import {UserEmail, UserPassword} from "../../domain/value_object/value_object";
import {MongoAuthRepo} from "./mongo_auth_repo";
import {IMongoHelper} from "../../../../shared/infra/db/mongo/helper";
import {Collection} from "mongodb";

describe('Mongo Auth Repo', function () {
    test('should be able to save user', async function () {
      const user = ProductUser.create({
          email: UserEmail.create({value: 'test@test.com'}),
          password: UserPassword.create({value: 'testpassword'})
      }).getValue()
        let repo = new MongoAuthRepo(new MongoTest());
        expect(await repo.saveUser(user)).not.toThrowError();
    })
});

class MongoTest implements IMongoHelper{
    connect(url: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    disconnect(): Promise<void> {
        return Promise.resolve(undefined);
    }

    getCollection(name: string): Collection {
        return undefined;
    }

    map(collection: any): any {
    }

    mapCollection(collection: any[]): any[] {
        return [];
    }

}