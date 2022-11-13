import {ValueObject} from "../../../../shared/domain/ValueObject";
import {ProductPriceProps} from "./product_price_props";
import {Result} from "../../../../shared/core/Result";
import {Guard} from "../../../../shared/core/Guard";


export class ProductPrice extends ValueObject<ProductPriceProps> {
    private constructor(props: ProductPriceProps) {
        super(props);
    }

    get value(): string {
        return this.props.value.toString()
    }

    static create(param: { value: number }): Result<ProductPrice> {
        const againstNullOrUndefined = Guard.againstNullOrUndefined(param.value,
            'price');

        if (againstNullOrUndefined.isFailure) {
            return Result.fail<ProductPrice>(againstNullOrUndefined.getErrorValue());
        }

        const result = Guard.combine([
            Guard.inRange(param.value, 1, 1000000, 'price')
        ])

        if(result.isFailure){
            return Result.fail('Its now with in range')
        }
        let price = param.value.toLocaleString("en-ZA", {
            style: "currency",
            currency: "ZAR",
            minimumFractionDigits: 0,
        });

        return Result.ok(new ProductPrice({value: price}));
    }
}