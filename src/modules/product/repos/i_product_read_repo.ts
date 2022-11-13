import {UserProduct} from "../domain/entity/user_product";

export interface IProductReadRepo {
    save(product: UserProduct): Promise<void>,
    update(product: UserProduct): Promise<void>,
    delete(product: UserProduct): Promise<void>,
}
