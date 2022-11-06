import {ChangePasswordUserDetailsDto} from "./change_password_user_details_dto";

export interface ChangePasswordDto {
    newPassword: string;
    token: string;
    userDetails: ChangePasswordUserDetailsDto;
}

