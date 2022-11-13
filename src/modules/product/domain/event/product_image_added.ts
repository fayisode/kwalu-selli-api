import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import {UniqueEntityID} from "../../../../shared/domain/UniqueEntityID";
import {UserProduct} from "../entity/user_product";

export class ProductImageAdded implements IDomainEvent{
    public static readonly eventName: string = "product.image.added";
    public readonly eventName: string = "product.image.added";
    public readonly imageInfo: any;
    public readonly productID:UniqueEntityID

    constructor( imageInfo: any, productID: UniqueEntityID) {
        this.imageInfo = imageInfo;
        this.productID = productID;
    }

    dateTimeOccurred: Date;

    getAggregateId(): UniqueEntityID {
        return this.productID;
    }
}