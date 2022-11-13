import {ValueObject} from "../../../../shared/domain/ValueObject";
import {Result} from "../../../../shared/core/Result";
import {Guard} from "../../../../shared/core/Guard";
import {ProductName} from "./product_name";

describe('Product Name', () => {
    let result: Result<ProductName>;
    beforeEach(() => {
      result = null
    })

    it('given a valid input, should create a valid product name', () => {
        const value = 'Ice Cream';
        result = ProductName.create({value : value});
        expect(result.isSuccess).toBeTruthy();
        expect(result.getValue().value).toBe(value);
    })

    it('given an invalid, should return a failure', function () {
        result = ProductName.create({value: ''});
        expect(result.isFailure).toBeTruthy();

        result = ProductName.create({value: null});
        expect(result.isFailure).toBeTruthy();

        result = ProductName.create({value: undefined});
        expect(result.isFailure).toBeTruthy();

        result = ProductName.create({value: 'aa'});
        expect(result.isFailure).toBeTruthy();
    })
})
