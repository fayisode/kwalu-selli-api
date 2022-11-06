import {ChangePasswordUserDetailsDto} from "../use_cases/change_password/change_password_user_details_dto";

export interface ProcessService {
    generateIdentifier(): string;

    generateOtp(): string;

    getOperationValues(userId: string): Promise<OperationValues>;

    checkOperationValid(userId: string,
                        values: OperationValues): Promise<boolean>;

    getResetOperationValues(userId: string): Promise<ChangePasswordUserDetailsDto>;
    checkResetOperation(userId: string,
                        userDetails: ChangePasswordUserDetailsDto): Promise<boolean>;
}


export interface OperationValues {
    process_name: string;
    otp: string;
    identifier: string;
    time: Date;
    type: string;
}