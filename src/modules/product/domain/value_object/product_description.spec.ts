import {Result} from "../../../../shared/core/Result";
import {ValueObject} from "../../../../shared/domain/ValueObject";
import {Guard} from "../../../../shared/core/Guard";
import {ProductDescription} from "./product_description";

describe('Product Description', () => {
    let result:Result<ProductDescription>
    beforeEach(() => {
        result = null
    })

    it('given a valid input, should create a valid product description', () => {
        const value = 'Quis itaque dolorem minus quos alias suscipit impedit. Officiis consectetur similique id sunt est autem rerum. Dignissimos iusto ea sit.';
        result = ProductDescription.create({value: value});
        expect(result.isSuccess).toBeTruthy();
        expect(result.getValue().value).toBe(value);
    })

    it('given an invalid, should return a failure', function () {
        result = ProductDescription.create({value: null});
        expect(result.isFailure).toBeTruthy();

        result = ProductDescription.create({value: ''});
        expect(result.isFailure).toBeTruthy();

        result = ProductDescription.create({value: 'quos alias suscipit impedit'});
        expect(result.isFailure).toBeTruthy();
    });
})


