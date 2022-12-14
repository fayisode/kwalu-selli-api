import {ProductUser} from "../domain/entity/product_user";
import {Mapper} from "../../../shared/infra/Mapper";
import {UserEmail, UserPassword} from "../domain/value_object/value_object";
import {UniqueEntityID} from "../../../shared/domain/UniqueEntityID";

export class UserMap implements Mapper<ProductUser> {
    public static toDomain(raw: any): ProductUser {
        const userOrError = ProductUser.create(
            {
                email: UserEmail.create({value: raw.email}),
                password: UserPassword.create({
                    value: raw.password,
                    hashed: true
                })
            },
            new UniqueEntityID(raw.userId)
        );

        userOrError.isFailure ? console.log(userOrError.getErrorValue()) : '';

        return userOrError.isSuccess ? userOrError.getValue() : null;
    }

    public static async toPersistence(user: ProductUser): Promise<any> {
        let passwordValue: string
        const password = user.password.getValue().value;
        if(user.password.getValue().isAlreadyHashed()) {
            passwordValue = password;
        }else{
            passwordValue = await user.password.getValue().getHashedValue();
        }
        return {
            userId: user.id.toValue(),
            email: user.email.getValue().value,
            password: passwordValue
        };
    }
}