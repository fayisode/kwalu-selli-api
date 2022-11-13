import {ValueObject} from "../../../../shared/domain/ValueObject";
import {Result} from "../../../../shared/core/Result";
import {Guard} from "../../../../shared/core/Guard";
import {ProductImageProps} from "./product_image_props";


export class ProductImage extends ValueObject<ProductImageProps>{

    private constructor(props: ProductImageProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }
    private static checkURL(url) {
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }
    static create(props: { value: string }): Result<ProductImage> {
        const againstNullOrUndefined = Guard.againstNullOrUndefined(props.value,
            'image');

        if(againstNullOrUndefined.isFailure){
            return Result.fail<ProductImage>(againstNullOrUndefined.getErrorValue());
        }
        if(!this.checkURL(props.value)){
            return Result.fail<ProductImage>('Error Processing Image');
        }

        return Result.ok(new ProductImage(props));
    }
}