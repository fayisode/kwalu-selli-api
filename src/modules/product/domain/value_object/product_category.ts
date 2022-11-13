import {ValueObject} from "../../../../shared/domain/ValueObject";
import {ProductCategoryProps} from "./product_category_props";
import {Result} from "../../../../shared/core/Result";
import {Guard} from "../../../../shared/core/Guard";
import {ProductCategoryEnum} from "./product_category_enum";

export class ProductCategory extends ValueObject<ProductCategoryProps> {
    private constructor(props: ProductCategoryProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    public static create(props: ProductCategoryProps): Result<ProductCategory> {
        let againstNullOrUndefined = Guard.againstNullOrUndefined(props.value,
            'product category');

        if (againstNullOrUndefined.isFailure) {
            return Result.fail<ProductCategory>('Product category cannot be null or undefined');
        }

        const key = Object.keys(ProductCategoryEnum).find(key => ProductCategoryEnum[key] === props.value);
        if(!key) {
            return Result.fail<ProductCategory>('Invalid product category');
        }
        return Result.ok<ProductCategory>(new ProductCategory(props));
    }
}
