import {IHandle} from "../../../shared/domain/events/IHandle";
import {IProductReadRepo} from "../repos/i_product_read_repo";
import {DomainEvents} from "../../../shared/domain/events/DomainEvents";
import {ProductDeleted} from "../domain/event/product_deleted";

export class AfterProductDeleted implements IHandle<ProductDeleted>{
    private productRepo: IProductReadRepo
    constructor(productRepo: IProductReadRepo) {
        this.productRepo = productRepo;
        this.setupSubscriptions()
    }

    setupSubscriptions(): void {
        DomainEvents.register(this.onProductEdited.bind(this), ProductDeleted.name)
    }

    private async onProductEdited(event: ProductDeleted): Promise<void> {
        console.log('Event Subscription ', event.eventName);
        await this.productRepo.delete(event.productId)
    }
}