import {Result} from "../../../../shared/core/Result";
import {ProductCategory} from "../value_object/product_category";
import {ProductPrice} from "../value_object/product_price";
import {ProductImage} from "../value_object/product_image";
import {ProductName} from "../value_object/product_name";
import {ProductDescription} from "../value_object/product_description";
import {UserProduct} from "./user_product";

describe('User Product', function () {
    let result: Result<UserProduct>
    beforeEach(() => {
        result = null
    })

    it('should know a valid product is created', function () {
        result = UserProduct.create({
            category: ProductCategory.create({value: 'FOOD'}),
            description: ProductDescription.create({value: 'Quis itaque dolorem minus quos alias suscipit impedit. Officiis consectetur similique id sunt est autem rerum. Dignissimos iusto ea sit.'}),
            image: [ProductImage.create({value: 'https://picsum.photos/200/300.jpeg'})],
            name: ProductName.create({value: 'test'}),
            price: ProductPrice.create({value: 100})
        }, null)

        expect(result.isSuccess).toBeTruthy()
    })

    it('given an invalid image format, should return an image error', function () {
        result = UserProduct.create({
            category: ProductCategory.create({value: 'FOOD'}),
            description: ProductDescription.create({value: 'Quis itaque dolorem minus quos alias suscipit impedit. Officiis consectetur similique id sunt est autem rerum. Dignissimos iusto ea sit.'}),
            image: [ProductImage.create({value: 'https://picsum.photos/200/300.jpeg'}), ProductImage.create({value: 'https://picsum.photos/200/300'})],
            name: ProductName.create({value: 'test'}),
            price: ProductPrice.create({value: 100})
        }, null)

        expect(result.isFailure).toBeTruthy()
    });
})
