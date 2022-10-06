import {IHandle} from "../../../shared/domain/events/IHandle";
import {UserCreated} from "../domain/event/user_created";
import {DomainEvents} from "../../../shared/domain/events/DomainEvents";

export class AfterUserCreated implements IHandle<UserCreated>{
    constructor() {
        this.setupSubscriptions();
    }

    setupSubscriptions(): void {
     DomainEvents.register(this.onUserCreated.bind(this), UserCreated.name)
    }

    private async onUserCreated(event: UserCreated): Promise<void> {
        console.log('User Created', event);
    }
}