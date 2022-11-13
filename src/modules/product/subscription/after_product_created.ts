import {ProductEdited} from "../domain/event/product_edited";
import {IHandle} from "../../../shared/domain/events/IHandle";
import {IProductReadRepo} from "../repos/i_product_read_repo";
import {DomainEvents} from "../../../shared/domain/events/DomainEvents";
import {ProductCreated} from "../domain/event/product_created";
import {IAuthRepo} from "../../auth/repos/i_auth_repo";
import {UserMap} from "../../auth/mapper/user_map";
import {UserProfileMap} from "../../auth/mapper/user_profile_map";
import {UserProduct} from "../domain/entity/user_product";
import {UserProductMap} from "../mapper/user_product_map";

export class AfterProductCreated implements IHandle<ProductCreated> {
    private productRepo: IProductReadRepo
    private authRepo: IAuthRepo

    constructor(productRepo: IProductReadRepo,
                authRepo: IAuthRepo) {
        this.productRepo = productRepo;
        this.authRepo = authRepo
        this.setupSubscriptions()
    }

    setupSubscriptions(): void {
        DomainEvents.register(this.onProductCreated.bind(this), ProductCreated.name)
    }

    private async onProductCreated(event: ProductCreated): Promise<void> {
        console.log('Event Subscription ', event.eventName);
        const user =  await this.authRepo.getProfileByEmail(event.email)
        const product = await UserProductMap.toPersistence(event.product)
        const userMap = await UserProfileMap.toPersistence(user)
        await this.productRepo.save({
            ...product,
            user_details: userMap
        })
    }
}