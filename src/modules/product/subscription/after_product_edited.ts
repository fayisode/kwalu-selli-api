import {ProductEdited} from "../domain/event/product_edited";
import {IHandle} from "../../../shared/domain/events/IHandle";
import {IProductReadRepo} from "../repos/i_product_read_repo";
import {DomainEvents} from "../../../shared/domain/events/DomainEvents";
import {UserProductMap} from "../mapper/user_product_map";

export class AfterProductEdited implements IHandle<ProductEdited>{
    private productRepo: IProductReadRepo
    constructor(productRepo: IProductReadRepo) {
        this.productRepo = productRepo;
        this.setupSubscriptions()
    }

    setupSubscriptions(): void {
        DomainEvents.register(this.onProductEdited.bind(this), ProductEdited.name)
    }

    private async onProductEdited(event: ProductEdited): Promise<void> {
        console.log('Event Subscription ', event.eventName);
        const product = await UserProductMap.toPersistence(event.product)
        await this.productRepo.update(product)
    }
}