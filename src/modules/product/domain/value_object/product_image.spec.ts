import {Result} from "../../../../shared/core/Result";
import {ValueObject} from "../../../../shared/domain/ValueObject";
import {Guard} from "../../../../shared/core/Guard";
import {ProductImage} from "./product_image";

describe('Product Image', () => {
    let result:Result<ProductImage>
    beforeEach(() => {
        result = null
    })

    it('given a valid input, should create a valid product image', () => {
        const value = 'https://picsum.photos/200/300.jpeg';
        result = ProductImage.create({value: value});
        expect(result.isSuccess).toBeTruthy();
        expect(result.getValue().value).toBe(value);
    })

    it('given an invalid, should return a failure', function () {
        result = ProductImage.create({value: ''});
        expect(result.isFailure).toBeTruthy();
        const value = 'https://picsum.photos/200/300';
        result = ProductImage.create({value: value});
        expect(result.isFailure).toBeTruthy();
    });
})
