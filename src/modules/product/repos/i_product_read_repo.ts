import {UserProduct} from "../domain/entity/user_product";

export interface IProductReadRepo {
    read(userEmail?: string, productId?: string): Promise<any>
    save(product: any): Promise<void>,
    update(product: any): Promise<void>,
    delete(product: any): Promise<void>,
    imageInfo(info: any): Promise<void>,
    updateImageInfo(info: any): Promise<void>,
}

