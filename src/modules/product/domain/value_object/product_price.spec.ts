import {ValueObject} from "../../../../shared/domain/ValueObject";
import {Result} from "../../../../shared/core/Result";
import {Guard} from "../../../../shared/core/Guard";
import {ProductPriceProps} from "./product_price_props";
import {ProductPrice} from "./product_price";

describe('Product Price', () => {
    let result: Result<ProductPrice>;
    beforeEach(() => {
        result = null;
    });

    it('given a valid input, should create a valid product price', () => {
        const value = 100;
        result = ProductPrice.create({value: value});
        expect(result.isSuccess).toBeTruthy();
        expect(result.getValue().value).toBe(`R ${value}`);
    });

    it('given an invalid, should return a failure', function () {
        result = ProductPrice.create({value: 0});
        expect(result.isFailure).toBeTruthy();
    });
})

