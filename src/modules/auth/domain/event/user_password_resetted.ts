import {IDomainEvent} from "../../../../shared/domain/events/IDomainEvent";
import {ProductUser} from "../entity/product_user";
import {UniqueEntityID} from "../../../../shared/domain/UniqueEntityID";

export class UserPasswordReset implements IDomainEvent {
    public static readonly eventName: string = "user.passwordReset";
    public readonly eventName: string = "user.passwordReset";
    public readonly user: ProductUser;
    public readonly pin: string;
    public readonly processInfo: any;

    constructor( user: ProductUser, pin: string, otpInfo: any) {
        this.user = user;
        this.pin = pin;
        this.processInfo = otpInfo;
    }

    dateTimeOccurred: Date;

    getAggregateId(): UniqueEntityID {
        return this.user.id;
    }
}