import {Mapper} from "../../../shared/infra/Mapper";
import {UserProduct} from "../domain/entity/user_product";
import {ProductCategory} from "../domain/value_object/product_category";
import {ProductDescription} from "../domain/value_object/product_description";
import {ProductImage} from "../domain/value_object/product_image";
import {ProductName} from "../domain/value_object/product_name";
import {ProductPrice} from "../domain/value_object/product_price";
import {UniqueEntityID} from "../../../shared/domain/UniqueEntityID";

export class UserProductMap implements Mapper<UserProduct> {
    public static async toPersistence(product: UserProduct): Promise<any> {
        return {
            productId: product.id.toValue(),
            category: product.category.getValue().value,
            description: product.description.getValue().value,
            image: product.image.map((image) => image.getValue().value),
            name: product.name.getValue().value,
            price: product.price.getValue().value,
        }
    }

    public static async toDomain(raw: any): Promise<UserProduct> {
        const productOrError = UserProduct.create({
            category: ProductCategory.create({value: raw.category}),
            description: ProductDescription.create({value: raw.description}),
            image: raw.image.map((image) => ProductImage.create({value: image})),
            name: ProductName.create({value: raw.name}),
            price: ProductPrice.create({value: raw.price})
        }, new UniqueEntityID(raw.productId))

        return productOrError.getValue()
    }
}