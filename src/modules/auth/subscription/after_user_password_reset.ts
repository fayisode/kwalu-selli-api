import {IHandle} from "../../../shared/domain/events/IHandle";
import {UserPasswordReset} from "../domain/event/user_password_resetted";
import {DomainEvents} from "../../../shared/domain/events/DomainEvents";
import {IAuthRepo} from "../repos/i_auth_repo";

export class AfterUserPasswordReset implements IHandle<UserPasswordReset>{
    private repo: IAuthRepo
    constructor(repo: IAuthRepo) {
        this.repo = repo
        this.setupSubscriptions()
    }
    setupSubscriptions(): void {
        DomainEvents.register(this.onUserPasswordReset.bind(this), UserPasswordReset.name)
    }

    private async onUserPasswordReset(event: UserPasswordReset): Promise<void> {
        console.log('Event Subscription ', event.eventName);
        await this.repo.saveVerification({ 'id': event.user.id.toValue(), 'pin': event.pin,
            'processInfo': event.processInfo,});
    }
}