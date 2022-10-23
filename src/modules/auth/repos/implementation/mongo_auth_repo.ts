import {ProductUser} from "../../domain/entity/product_user";
import {UserProfile} from "../../domain/entity/user_profile";
import {IAuthRepo} from "../i_auth_repo";
import {IMongoHelper, MongoHelper} from "../../../../shared/infra/db/mongo/helper";
import {UserMap} from "../../mapper/user_map";
import {UserProfileMap} from "../../mapper/user_profile_map";
import {Collection, Document} from "mongodb";
import {DomainEvents} from "../../../../shared/domain/events/DomainEvents";

export class MongoAuthRepo implements IAuthRepo {
    private mongoHelper: IMongoHelper;

    constructor(mongo: IMongoHelper) {
        this.mongoHelper = mongo
    }

    async getProfileByEmail(email: string): Promise<UserProfile> {
        const collection = this.getProfileCollection();
        let profileDocs = await this.findEmailFromCollection(collection, email);
        return UserProfileMap.toDomain(profileDocs);
    }

    private getProfileCollection() {
        return this.mongoHelper.getCollection('profile');
    }


    private findEmailFromCollection(collection: Collection<Document>, email: string) {
        return collection.findOne({email: email});
    }

    async getUserByEmail(email: string): Promise<ProductUser> {
        const collection = this.getUsersCollection();
        let userDocs = await this.findEmailFromCollection(collection, email);
        return UserMap.toDomain(userDocs);
    }

    private getUsersCollection(): Collection<Document> {
        return this.mongoHelper.getCollection('users');
    }

    async saveProfile(profile: UserProfile): Promise<void> {
        const collection = this.getProfileCollection()
        const profileDoc = UserProfileMap.toPersistence(profile);
        await collection.insertOne(profileDoc);
    }

    async saveUser(user: ProductUser): Promise<void> {
        const exist = await this.exists(user.email.getValue().value)

        if (!exist) {
            const collection: Collection = this.getUsersCollection()
            const userDoc = await UserMap.toPersistence(user);
            await collection.insertOne(userDoc);
            DomainEvents.dispatchEventsForAggregate(user.id);
        }
    }

    async exists(email: string): Promise<boolean> {
        let user;
        try {
            user = await this.getUserByEmail(email);
        } catch (e) {

        }

        return !!user === true;
    }

    async  signInUser(user: ProductUser): Promise<void> {
        DomainEvents.dispatchEventsForAggregate(user.id);
    }

    async updateUserLastLogin(userId: string, date: Date): Promise<void> {
        const collection: Collection = this.getUsersCollection()
        await collection.updateOne(
            {userId: userId},
            {
                $set: {'lastLogin': date},
                $currentDate: { lastModified: true }
            }
        )
        return Promise.resolve();
    }

}