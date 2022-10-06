import {IDomainEvent} from "../../../../shared/domain/events/IDomainEvent";
import {UserProfile} from "../entity/user_profile";
import {UniqueEntityID} from "../../../../shared/domain/UniqueEntityID";

export class UserCreated implements IDomainEvent {
    public static readonly eventName: string = "user.created";
    public readonly eventName: string = "user.created";
    public readonly profile: UserProfile;

    constructor(profile: UserProfile) {
        this.profile = profile;
    }

    dateTimeOccurred: Date;

    getAggregateId(): UniqueEntityID {
        return this.profile.id;
    }
}