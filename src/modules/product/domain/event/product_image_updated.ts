import {IDomainEvent} from "../../../../shared/domain/events/IDomainEvent";
import {UniqueEntityID} from "../../../../shared/domain/UniqueEntityID";


export class ProductImageUpdated implements IDomainEvent{
    public static readonly eventName: string = "product.image.updated";
    public readonly eventName: string = "product.image.updated";
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