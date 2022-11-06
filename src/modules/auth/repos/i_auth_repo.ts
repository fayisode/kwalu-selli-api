import {UserProfile} from "../domain/entity/user_profile";
import {ProductUser} from "../domain/entity/product_user";
import {OperationValues} from "../services/process_service";
import {ChangePasswordUserDetailsDto} from "../use_cases/change_password/change_password_user_details_dto";

export interface IAuthRepo {
    exists(email: string): Promise<boolean>;
    saveProfile(profile: UserProfile): Promise<void>;
    getProfileByEmail(email: string): Promise<UserProfile>;
    saveUser(user:ProductUser): Promise<void>;
    getUserByEmail(email: string): Promise<ProductUser>;
    signInUser(user:ProductUser): Promise<void>;
    updateUser(userId: string, data: any): Promise<void>;
    saveVerification(values: any): Promise<void>
    getVerificationDetails(id: string): Promise<OperationValues>
    getResetPasswordDetails(userId: string): Promise<ChangePasswordUserDetailsDto>;
}