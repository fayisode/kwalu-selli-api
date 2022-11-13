import {Result} from "../../../shared/core/Result"
import {UserProduct} from "../domain/entity/user_product";
import {ProductCategory} from "../domain/value_object/product_category";
import {ProductDescription} from "../domain/value_object/product_description";
import {ProductImage} from "../domain/value_object/product_image";
import {ProductName} from "../domain/value_object/product_name";
import {ProductPrice} from "../domain/value_object/product_price";
import {UniqueEntityID} from "../../../shared/domain/UniqueEntityID";
import {UserProductMap} from "./user_product_map";

describe('Product Map', () => {
    let domain: UserProduct
    let map: any

    beforeEach(() => {
        domain = null
        map = null
    })

    it('given a valid domain object return a map', async function () {
        map = await UserProductMap.toPersistence(domainValue.getValue())
        expect(map).not.toBeNull()
    });

    it('given a valid map object return a domain', async function () {
        domain = await UserProductMap.toDomain(mapValue)
        expect(domain).toStrictEqual(domainValue.getValue())

        domain = await UserProductMap.toDomain(mapValueWithMultipleImage)
        expect(domain).toStrictEqual(domainValueWithMultipleImage.getValue())
    });
})
let mapValue = {
    "productId": "711838c2-0a4b-4e69-9266-a3e2ae9a9c5b",
    "category": "FOOD",
    "description": "Quis itaque dolorem minus quos alias suscipit impedit. Officiis consectetur similique id sunt est autem rerum. Dignissimos iusto ea sit.",
    "image": [
        "https://picsum.photos/200/300.jpeg"
    ],
    "name": "test",
    "price": 100,
}

let mapValueWithMultipleImage = {
    "productId": "711838c2-0a4b-4e69-9266-a3e2ae9a9c5b",
    "category": "FOOD",
    "description": "Quis itaque dolorem minus quos alias suscipit impedit. Officiis consectetur similique id sunt est autem rerum. Dignissimos iusto ea sit.",
    "image": [
        "https://picsum.photos/200/300.jpeg",
        "https://picsum.photos/200/300.jpeg",
        "https://picsum.photos/200/300.jpeg",
        "https://picsum.photos/200/300.jpeg",
    ],
    "name": "test",
    "price": 100,
}
let domainValue: Result<UserProduct> = UserProduct.create({
    category: ProductCategory.create({value: 'FOOD'}),
    description: ProductDescription.create({value: 'Quis itaque dolorem minus quos alias suscipit impedit. Officiis consectetur similique id sunt est autem rerum. Dignissimos iusto ea sit.'}),
    image: [ProductImage.create({value: 'https://picsum.photos/200/300.jpeg'})],
    name: ProductName.create({value: 'test'}),
    price: ProductPrice.create({value: 100})
}, new UniqueEntityID('711838c2-0a4b-4e69-9266-a3e2ae9a9c5b'))

let domainValueWithMultipleImage: Result<UserProduct> = UserProduct.create({
    category: ProductCategory.create({value: 'FOOD'}),
    description: ProductDescription.create({value: 'Quis itaque dolorem minus quos alias suscipit impedit. Officiis consectetur similique id sunt est autem rerum. Dignissimos iusto ea sit.'}),
    image: [
        ProductImage.create({value: 'https://picsum.photos/200/300.jpeg'}),
        ProductImage.create({value: 'https://picsum.photos/200/300.jpeg'})
        , ProductImage.create({value: 'https://picsum.photos/200/300.jpeg'})
        , ProductImage.create({value: 'https://picsum.photos/200/300.jpeg'})
    ],
    name: ProductName.create({value: 'test'}),
    price: ProductPrice.create({value: 100})
}, new UniqueEntityID('711838c2-0a4b-4e69-9266-a3e2ae9a9c5b'))
