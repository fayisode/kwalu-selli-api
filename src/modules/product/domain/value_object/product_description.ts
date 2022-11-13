import {ValueObject} from "../../../../shared/domain/ValueObject";
import {Result} from "../../../../shared/core/Result";
import {Guard} from "../../../../shared/core/Guard";
import {ProductDescriptionProps} from "./product_description_props";

export class ProductDescription extends ValueObject<ProductDescriptionProps>{

    static min:number = 30;
    static max:number = 500;

    private constructor(props: ProductDescriptionProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }
    static create(param: ProductDescriptionProps): Result<ProductDescription> {
        const againstNullOrUndefined = Guard.againstNullOrUndefined(param.value,
            'description');

        if(againstNullOrUndefined.isFailure){
            return Result.fail<ProductDescription>(againstNullOrUndefined.getErrorValue());
        }

        const guardWithInRange = Guard.inRange(param.value.length,
            ProductDescription.min,
            ProductDescription.max,
            'description');

        if(guardWithInRange.isFailure){
            return Result.fail<ProductDescription>(guardWithInRange.getErrorValue());
        }

        return Result.ok(new ProductDescription(param));
    }
}