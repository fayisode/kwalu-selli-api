import {IAuthRepo} from "../repos/i_auth_repo";
import {UserProfile} from "../domain/entity/user_profile";
import {ProductUser} from "../domain/entity/product_user";

export class TextAuthRepo implements IAuthRepo {
    async exists(email: string): Promise<boolean> {
        return true;
    }

    getProfileByEmail(email: string): Promise<UserProfile> {
        return Promise.resolve(undefined);
    }

    getUserByEmail(email: string): Promise<ProductUser> {
        return Promise.resolve(undefined);
    }

    saveProfile(profile: UserProfile): Promise<void> {
        return Promise.resolve(undefined);
    }

    saveUser(user: ProductUser): Promise<void> {
        return Promise.resolve(undefined);
    }
}

export class TextRepo2 implements IAuthRepo {
    async exists(email: string): Promise<boolean> {
        return false;
    }

    async save(user: ProductUser): Promise<void> {
    }

    getProfileByEmail(email: string): Promise<UserProfile> {
        return Promise.resolve(undefined);
    }

    getUserByEmail(email: string): Promise<ProductUser> {
        return Promise.resolve(undefined);
    }

    saveProfile(profile: UserProfile): Promise<void> {
        return Promise.resolve(undefined);
    }

    saveUser(user: ProductUser): Promise<void> {
        return Promise.resolve(undefined);
    }
}

export class TextRepo3 implements IAuthRepo {
    exists(email: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    getProfileByEmail(email: string): Promise<UserProfile> {
        return Promise.resolve(undefined);
    }

    getUserByEmail(email: string): Promise<ProductUser> {
        return Promise.resolve(undefined);
    }

    saveProfile(profile: UserProfile): Promise<void> {
        throw new Error("Testing error");
    }

    saveUser(user: ProductUser): Promise<void> {
        return Promise.resolve(undefined);
    }

}