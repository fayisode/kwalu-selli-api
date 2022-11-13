import {IHandle} from "../../../shared/domain/events/IHandle";
import { ProductImageAdded } from "../domain/event/product_image_added";
import {IProductReadRepo} from "../repos/i_product_read_repo";
import {DomainEvents} from "../../../shared/domain/events/DomainEvents";


export class AfterImageAdded implements IHandle<ProductImageAdded>{
    private productRepo: IProductReadRepo
    constructor(productRepo: IProductReadRepo) {
        this.productRepo = productRepo;
        this.setupSubscriptions()
    }
    setupSubscriptions(): void {
        DomainEvents.register(this.onImageAdded.bind(this), ProductImageAdded.name)
    }
    private async onImageAdded(event: ProductImageAdded): Promise<void> {
        console.log('Event Subscription ', event.eventName);
        await this.productRepo.imageInfo({
            product_id: event.productID.toValue(),
            image_info: event.imageInfo
        })
    }
}