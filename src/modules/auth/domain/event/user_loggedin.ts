import {ProductUser} from "../entity/product_user";
import {UniqueEntityID} from "../../../../shared/domain/UniqueEntityID";
import {IDomainEvent} from "../../../../shared/domain/events/IDomainEvent";

export class UserLoggedIn implements IDomainEvent {
    public static readonly eventName: string = "user.loggedin";
    public readonly eventName: string = "user.loggedin";
    public readonly user: ProductUser;

    constructor( user: ProductUser) {
        this.user = user;
    }

    dateTimeOccurred: Date;

    getAggregateId(): UniqueEntityID {
        return this.user.id;
    }
}