import {ProductEdited} from "../domain/event/product_edited";
import {IHandle} from "../../../shared/domain/events/IHandle";
import {IProductReadRepo} from "../repos/i_product_read_repo";
import {DomainEvents} from "../../../shared/domain/events/DomainEvents";
import {ProductCreated} from "../domain/event/product_created";

export class AfterProductCreated implements IHandle<ProductCreated>{
    private productRepo: IProductReadRepo
    constructor(productRepo: IProductReadRepo) {
        this.productRepo = productRepo;
    }

    setupSubscriptions(): void {
        DomainEvents.register(this.onProductEdited.bind(this), ProductCreated.name)
    }

    private async onProductEdited(event: ProductCreated): Promise<void> {
        console.log('Event Subscription ', event.eventName);
        await this.productRepo.update(event.product)
    }
}