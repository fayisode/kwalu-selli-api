import {IHandle} from "../../../shared/domain/events/IHandle";
import {IProductReadRepo} from "../repos/i_product_read_repo";
import {DomainEvents} from "../../../shared/domain/events/DomainEvents";
import {ProductImageUpdated} from "../domain/event/product_image_updated";


export class AfterImageUpdated implements IHandle<ProductImageUpdated>{
    private productRepo: IProductReadRepo
    constructor(productRepo: IProductReadRepo) {
        this.productRepo = productRepo;
        this.setupSubscriptions()
    }
    setupSubscriptions(): void {
        DomainEvents.register(this.onImageUpdated.bind(this), ProductImageUpdated.name)
    }
    private async onImageUpdated(event: ProductImageUpdated): Promise<void> {
        console.log('Event Subscription ', event.eventName);
        await this.productRepo.updateImageInfo({
            product_id: event.productID.toValue(),
            image_info: event.imageInfo
        })
    }
}