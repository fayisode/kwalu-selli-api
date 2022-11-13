import {Result} from "../../../../shared/core/Result";
import {ProductCategory} from "../value_object/product_category";
import {ProductPrice} from "../value_object/product_price";
import {ProductImage} from "../value_object/product_image";
import {ProductName} from "../value_object/product_name";

export interface UserProductProps {
    category: Result<ProductCategory>,
    description: Result<ProductCategory>,
    price: Result<ProductPrice>,
    image: Result<ProductImage>[],
    name: Result<ProductName>,
}
