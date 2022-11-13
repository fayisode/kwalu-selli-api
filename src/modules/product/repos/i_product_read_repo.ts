import {UserProduct} from "../domain/entity/user_product";

export interface IProductReadRepo {
    save(product: any): Promise<void>,
    update(product: any): Promise<void>,
    delete(product: any): Promise<void>,
    imageInfo(info: any): Promise<void>,
    updateImageInfo(info: any): Promise<void>,
}

