import {ProductUser} from "../../domain/entity/product_user";
import {UserProfile} from "../../domain/entity/user_profile";
import {IAuthRepo} from "../i_auth_repo";
import {IMongoHelper} from "../../../../shared/infra/db/mongo/helper";
import {UserMap} from "../../mapper/user_map";
import {UserProfileMap} from "../../mapper/user_profile_map";
import {Collection, Document} from "mongodb";
import {DomainEvents} from "../../../../shared/domain/events/DomainEvents";
import {OperationValues} from "../../services/process_service";
import {ChangePasswordUserDetailsDto} from "../../use_cases/change_password/change_password_user_details_dto";

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

    private getVerificationCollection(): Collection<Document> {
        return this.mongoHelper.getCollection('verification');
    }

    async saveVerification(values: any): Promise<void> {
        const collection = this.getVerificationCollection()
        // await collection.insertOne(values);
        await collection.updateOne(
            {id: values.id},
            {
                $set: {...values},
                $currentDate: {lastModified: true}
            },
            {upsert: true}
        )
    }

    async getVerificationDetails(id: string): Promise<OperationValues> {
        const collection = this.getVerificationCollection()
        const result = await collection.findOne({id: id});
        return {
            process_name: result.processInfo.operation.process_name,
            otp: result.pin,
            identifier: result.processInfo.identifier,
            time: result.processInfo.operation.time,
            type: result.processInfo.operation.type
        }
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

    async signInUser(user: ProductUser): Promise<void> {
        DomainEvents.dispatchEventsForAggregate(user.id);
    }

    async updateUser(userId: string, data: any): Promise<void> {
        const collection: Collection = this.getUsersCollection()
        await collection.updateOne(
            {userId: userId},
            {
                $set: {...data},
                $currentDate: {lastModified: true}
            }
        )
        return Promise.resolve();
    }

    async getResetPasswordDetails(userId: string): Promise<ChangePasswordUserDetailsDto> {
        const collection = this.getVerificationCollection()
        const result = await collection.findOne({id: userId});
        return {
            identifier: result.verification.identifier,
            type: result.verification.type,
            date: result.verification.date,

        };
    }

}