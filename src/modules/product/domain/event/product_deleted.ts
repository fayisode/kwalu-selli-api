import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import {UniqueEntityID} from "../../../../shared/domain/UniqueEntityID";
import {UserProduct} from "../entity/user_product";

export class ProductDeleted implements IDomainEvent{
    public static readonly eventName: string = "product.deleted";
    public readonly eventName: string = "product.deleted";
    public readonly productId: UniqueEntityID;
    constructor(productId: UniqueEntityID) {
        this.productId = productId;
    }

    dateTimeOccurred: Date;

    getAggregateId(): UniqueEntityID {
        return this.productId;
    }
}