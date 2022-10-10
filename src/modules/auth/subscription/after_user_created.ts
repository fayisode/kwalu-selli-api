import {IHandle} from "../../../shared/domain/events/IHandle";
import {UserCreated} from "../domain/event/user_created";
import {DomainEvents} from "../../../shared/domain/events/DomainEvents";
import {UpdateProfileUseCase} from "../use_cases/update_profile/update_profile_use_case";

export class AfterUserCreated implements IHandle<UserCreated>{
    private useCase: UpdateProfileUseCase
    constructor(useCase: UpdateProfileUseCase) {
        this.useCase = useCase;
        this.setupSubscriptions();
    }

    setupSubscriptions(): void {
     DomainEvents.register(this.onUserCreated.bind(this), UserCreated.name)
    }

    private async onUserCreated(event: UserCreated): Promise<void> {
        console.log('Event Subscription ', event.eventName);
        await this.useCase.execute({
            lastName: event.profile.lastName.value,
            phone: event.profile.phone.value,
            nationalId: event.profile.nationalId.value,
            location: event.profile.location,
            avatar: event.profile.avatar,
            email: event.profile.email.value,
            firstName: event.profile.firstName.value,
        })
    }
}