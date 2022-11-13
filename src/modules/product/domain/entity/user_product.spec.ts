import {Result} from "../../../../shared/core/Result";
import {AggregateRoot} from "../../../../shared/domain/AggregateRoot";
import {ProductCategory} from "../value_object/product_category";
import {ProductPrice} from "../value_object/product_price";
import {ProductImage} from "../value_object/product_image";
import {ProductName} from "../value_object/product_name";
import {UniqueEntityID} from "../../../../shared/domain/UniqueEntityID";
import {ProductDescription} from "../value_object/product_description";
import {ProductCreated} from "../event/product_created";
import {ProductEdited} from "../event/product_edited";
import {ProductDeleted} from "../event/product_deleted";

describe('User Product', function () {
    let result: Result<UserProduct>
    beforeEach(() => {
        result = null
    })

    it('should know a valid product is created', function () {
        result = UserProduct.create({
            category: ProductCategory.create({value: 'FOOD'}),
            description: ProductDescription.create({value: 'Quis itaque dolorem minus quos alias suscipit impedit. Officiis consectetur similique id sunt est autem rerum. Dignissimos iusto ea sit.'}),
            image: [ProductImage.create({value: 'https://picsum.photos/200/300.jpeg'})],
            name: ProductName.create({value: 'test'}),
            price: ProductPrice.create({value: 100})
        }, null)

        expect(result.isSuccess).toBeTruthy()
    })

    it('given an invalid image format, should return an image error', function () {
        result = UserProduct.create({
            category: ProductCategory.create({value: 'FOOD'}),
            description: ProductDescription.create({value: 'Quis itaque dolorem minus quos alias suscipit impedit. Officiis consectetur similique id sunt est autem rerum. Dignissimos iusto ea sit.'}),
            image: [ProductImage.create({value: 'https://picsum.photos/200/300.jpeg'}),ProductImage.create({value: 'https://picsum.photos/200/300'})],
            name: ProductName.create({value: 'test'}),
            price: ProductPrice.create({value: 100})
        }, null)

        expect(result.isFailure).toBeTruthy()
    });
})

export interface UserProductProps {
    category: Result<ProductCategory>,
    description: Result<ProductCategory>,
    price: Result<ProductPrice>,
    image: Result<ProductImage>[],
    name: Result<ProductName>,
}

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