import {UserProfile} from "../domain/entity/user_profile";
import {ProductUser} from "../domain/entity/product_user";

export interface IAuthRepo {
    exists(email: string): Promise<boolean>;
    saveProfile(profile: UserProfile): Promise<void>;
    getProfileByEmail(email: string): Promise<UserProfile>;
    saveUser(user:ProductUser): Promise<void>;
    getUserByEmail(email: string): Promise<ProductUser>;
    signInUser(user:ProductUser): Promise<void>;
    updateUserLastLogin(userId: string, date:Date): Promise<void>;
}