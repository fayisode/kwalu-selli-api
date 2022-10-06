import {AggregateRoot} from "../../../../shared/domain/AggregateRoot";
import {Result} from "../../../../shared/core/Result";
import {UserEmail} from "../value_object/user_email";
import {UserPassword} from "../value_object/user_password";
import {UniqueEntityID} from "../../../../shared/domain/UniqueEntityID";
import {UserProfile} from "./user_profile";
import {UserCreated} from "../event/user_created";
import {JWTToken} from "../helper/jwt";
import {UserLoggedIn} from "../event/user_loggedin";

interface ProductUserProps {
    email: Result<UserEmail>,
    password:Result<UserPassword>,
    lastLogin?: Date,
    accessToken?: JWTToken,
}

export class ProductUser extends  AggregateRoot<ProductUserProps>{
    constructor(props: ProductUserProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    get email(): Result<UserEmail> {
        return this.props.email;
    }

    get password(): Result<UserPassword> {
        return this.props.password;
    }

    public setAccessToken(token: JWTToken): void {
        this.props.lastLogin = new Date();
        this.props.accessToken = token;
        this.addDomainEvent(new UserLoggedIn(this));
    }

    public userCreated(profile: UserProfile): void{
        this.addDomainEvent(new UserCreated(profile));
    }

    static create(props: ProductUserProps, id?: UniqueEntityID): Result<ProductUser> {
        const result = Result.combine([
            props.email,
            props.password
        ])

        if(result.isFailure){
            return Result.fail<ProductUser>(result.getErrorValue())
        }

        const productUser = new ProductUser(props, id);
        return Result.ok<ProductUser>(productUser);
    }
}