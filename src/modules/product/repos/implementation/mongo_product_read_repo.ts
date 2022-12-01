import {IProductWriteRepo} from "../i_product_write_repo";
import {IMongoHelper} from "../../../../shared/infra/db/mongo/helper";
import {IProductReadRepo} from "../i_product_read_repo";
import {Collection} from "mongodb";

export class MongoProductReadRepo implements IProductReadRepo {
    private mongoHelper: IMongoHelper;

    constructor(mongo: IMongoHelper) {
        this.mongoHelper = mongo
    }

    private getProductCollection() {
        return this.mongoHelper.getCollection('product read');
    }

    private getImageInfoCollection() {
        return this.mongoHelper.getCollection('image info');
    }

    async delete(productId: any): Promise<void> {
        const collection: Collection = this.getProductCollection();
        await collection.deleteOne({id: productId.toValue()});
    }

    async imageInfo(info: any): Promise<void> {
        const collection: Collection = this.getImageInfoCollection();
        await collection.insertOne(info);
    }

    async save(product: any): Promise<void> {
        const collection: Collection = this.getProductCollection();
        await collection.insertOne(product);
    }

    async update(product: any): Promise<void> {
        const collection: Collection = this.getProductCollection();
        await collection.updateOne(
            {id: product.productId},
            {
                $set: {...product}
            })
    }

    async updateImageInfo(info: any): Promise<void> {
        const collection: Collection = this.getImageInfoCollection();
        await collection.updateOne(
            {id: info.productId},
            {
                $set: {...info}
            })
    }

    async read(userEmail?: string, productId?: string): Promise<any> {
        const collection: Collection = this.getProductCollection();
        let query = null
        if (productId && userEmail) {
            query = {
                'productId': productId,
                'user_details.email': userEmail
            }
        }else if(productId){
            query = {
                'productId': productId
            }
        }else if(userEmail){
            query = {
                'user_details.email': userEmail
            }
        }
        return collection.find(
            query
        ).toArray()
    }
}