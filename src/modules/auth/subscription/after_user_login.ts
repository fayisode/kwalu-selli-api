import {IHandle} from "../../../shared/domain/events/IHandle";
import {UserLoggedIn} from "../domain/event/user_loggedin";
import {DomainEvents} from "../../../shared/domain/events/DomainEvents";
import {UpdateUserLastLoginUseCase} from "../use_cases/update_user_last_login/update_user_last_login_use_case";

export class AfterUserLogin implements  IHandle<UserLoggedIn>{
    private useCase: UpdateUserLastLoginUseCase
    constructor(useCase: UpdateUserLastLoginUseCase) {
        this.useCase = useCase
        this.setupSubscriptions()
    }
    setupSubscriptions(): void {
        DomainEvents.register(this.onUserLoggedIn.bind(this), UserLoggedIn.name)
    }

    private async onUserLoggedIn(event: UserLoggedIn): Promise<void> {
        console.log('Event Subscription ', event.eventName);
        await this.useCase.execute(
            {
                userId: event.user.id.toValue() as string,
                date: event.user.lastLogin
            }
        )
    }
}