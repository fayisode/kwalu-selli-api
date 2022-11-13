import {ValueObject} from "../../../../shared/domain/ValueObject";
import {Result} from "../../../../shared/core/Result";
import {Guard} from "../../../../shared/core/Guard";
import {ProductNameProps} from "./product_name_props";


export class ProductName extends ValueObject<ProductNameProps>{
    static min: number = 3;
    static max: number = 50;

    private constructor(props: ProductNameProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }


    static create(props: ProductNameProps): Result<ProductName>  {
        const againstNullOrUndefined = Guard.againstNullOrUndefined(props.value,
            'Product name');

        if(againstNullOrUndefined.isFailure){
            return Result.fail<ProductName>(againstNullOrUndefined.getErrorValue());
        }

        const guardWithInRange = Guard.inRange(props.value.length,
            ProductName.min,
            ProductName.max,
            props.value);

        if(guardWithInRange.isFailure){
            return Result.fail<ProductName>(guardWithInRange.getErrorValue());
        }

        return Result.ok(new ProductName(props));
    }
}