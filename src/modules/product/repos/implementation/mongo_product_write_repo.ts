import {IProductWriteRepo} from "../i_product_write_repo";
import {UserProduct} from "../../domain/entity/user_product";
import {UniqueEntityID} from "../../../../shared/domain/UniqueEntityID";
import {IMongoHelper} from "../../../../shared/infra/db/mongo/helper";
import {DomainEvents} from "../../../../shared/domain/events/DomainEvents";
import {Collection} from "mongodb";
import {UserProductMap} from "../../mapper/user_product_map";

export class MongoProductWriteRepo implements IProductWriteRepo{
    private mongoHelper: IMongoHelper;

    constructor(mongo: IMongoHelper) {
        this.mongoHelper = mongo
    }

    private getProductCollection() {
        return this.mongoHelper.getCollection('product write');
    }
    async delete(productId: UniqueEntityID): Promise<void> {
        DomainEvents.dispatchEventsForAggregate(productId);
    }

    async exists(id: UniqueEntityID): Promise<boolean> {
        return false;
    }

    async save(product: UserProduct): Promise<void> {
        const collection: Collection = this.getProductCollection();
        const productDoc = await UserProductMap.toPersistence(product);
        await collection.insertOne(productDoc);
        DomainEvents.dispatchEventsForAggregate(product.id);
    }

    async update(product: UserProduct): Promise<void> {
        const collection: Collection = this.getProductCollection();
        const productDoc = await UserProductMap.toPersistence(product);
        productDoc.delete('productId');
        await collection.updateOne(
            {id: product.id.toValue()},
            {
                $set: {...productDoc}
            })
        DomainEvents.dispatchEventsForAggregate(product.id);
    }
}