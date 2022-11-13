import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import {UserProduct} from "../domain/entity/user_product";

export interface IProductWriteRepo {
    exists(id: UniqueEntityID):  Promise<boolean>;
    save(product: UserProduct): Promise<void>,
    update(product: UserProduct): Promise<void>,
}