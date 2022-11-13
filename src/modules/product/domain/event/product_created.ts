import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import {UniqueEntityID} from "../../../../shared/domain/UniqueEntityID";
import {UserProduct} from "../entity/user_product";

export class ProductCreated implements IDomainEvent{
    public static readonly eventName: string = "product.created";
    public readonly eventName: string = "product.created";
    public readonly product: UserProduct;
    public readonly email: string

    constructor(product: UserProduct, email: string) {
        this.product = product;
        this.email = email;
    }

    dateTimeOccurred: Date;

    getAggregateId(): UniqueEntityID {
        return this.product.id;
    }
}