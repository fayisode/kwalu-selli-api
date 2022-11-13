import {ValueObject} from "../../../../shared/domain/ValueObject";
import {Result} from "../../../../shared/core/Result";
import {Guard} from "../../../../shared/core/Guard";
import {ProductCategoryEnum} from "./product_category_enum";
import {ProductCategoryProps} from "./product_category_props";
import {ProductCategory} from "./product_category";

describe('ProductCategory', () => {
    let productCategory: ProductCategoryEnum;
    let result: Result<ProductCategory>;

    beforeEach(() => {
        productCategory = null;
    });

    it('should be able to create a product category', () => {
        productCategory = ProductCategoryEnum.ELECTRONICS;
        expect(productCategory).toBe('ELECTRONICS');
        productCategory = ProductCategoryEnum.BOOKS;
        expect(productCategory).toBe('BOOKS');
        productCategory = ProductCategoryEnum.CLOTHING;
        expect(productCategory).toBe('CLOTHING');
        productCategory = ProductCategoryEnum.OTHER;
        expect(productCategory).toBe('OTHER')
        productCategory = ProductCategoryEnum.HEALTH;
        expect(productCategory).toBe('HEALTH');
        productCategory = ProductCategoryEnum.FOOD;
        expect(productCategory).toBe('FOOD')
    });

    it('given an enum string type, check its category type, return success', function () {
        result = ProductCategory.create({value: 'ELECTRONICS'});
        expect(result.isSuccess).toBeTruthy();
        expect(result.getValue().value).toBe(ProductCategoryEnum.ELECTRONICS);
    });

    it('given an invalid string not within the category, return failure', function () {
        result = ProductCategory.create({value: ''});
        expect(result.isFailure).toBeTruthy();
        result = ProductCategory.create({value: 'ELECT'});
        expect(result.isFailure).toBeTruthy();
        result = ProductCategory.create({value: 'HEALT'});
        expect(result.isFailure).toBeTruthy();
    });
})


