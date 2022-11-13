import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import {UniqueEntityID} from "../../../../shared/domain/UniqueEntityID";
import {UserProduct} from "../entity/user_product";

export class ProductEdited implements IDomainEvent{
    public static readonly eventName: string = "product.edited";
    public readonly eventName: string = "product.edited";
    public readonly product: UserProduct;
    constructor(product: UserProduct) {
        this.product = product;
    }

    dateTimeOccurred: Date;

    getAggregateId(): UniqueEntityID {
        return this.product.id;
    }
}