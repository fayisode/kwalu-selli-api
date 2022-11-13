import {AggregateRoot} from "../../../../shared/domain/AggregateRoot";
import {UserProductProps} from "./user_product_props";
import {UniqueEntityID} from "../../../../shared/domain/UniqueEntityID";
import {Result} from "../../../../shared/core/Result";
import {ProductCategory} from "../value_object/product_category";
import {ProductPrice} from "../value_object/product_price";
import {ProductImage} from "../value_object/product_image";
import {ProductName} from "../value_object/product_name";
import {ProductCreated} from "../event/product_created";
import {ProductEdited} from "../event/product_edited";
import {ProductDeleted} from "../event/product_deleted";


export class UserProduct extends AggregateRoot<UserProductProps> {
    constructor(props: UserProductProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get category(): Result<ProductCategory> {
        return this.props.category;
    }

    get description(): Result<ProductCategory> {
        return this.props.description;
    }

    get price(): Result<ProductPrice> {
        return this.props.price;
    }

    get image(): Result<ProductImage>[] {
        return this.props.image;
    }

    get name(): Result<ProductName> {
        return this.props.name;
    }

    public productCreated():void{
        this.addDomainEvent(new ProductCreated(this))
    }

    public productEdited():void{
        this.addDomainEvent(new ProductEdited(this))
    }

    public productDeleted():void{
        this.addDomainEvent(new ProductDeleted(this))
    }

    static create(param: UserProductProps, id?: UniqueEntityID): Result<UserProduct> {
        const result = Result.combine([
            param.category,
            param.description,
            param.price,
            param.name
        ])

        if(result.isFailure){
            return Result.fail<UserProduct>(result.getErrorValue())
        }

        const image = Result.combine(param.image)
        if(image.isFailure){
            return Result.fail<UserProduct>(image.getErrorValue())
        }
        return Result.ok(new UserProduct(param, id));
    }
}