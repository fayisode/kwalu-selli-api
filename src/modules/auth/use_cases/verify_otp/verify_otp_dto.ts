import {OperationValues} from "../../services/process_service";

export interface VerifyOtpDto {
    token: string,
    userDetails: OperationValues
}