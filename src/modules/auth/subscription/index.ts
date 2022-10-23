import {AfterUserCreated} from "./after_user_created";
import {updateProfileUseCase} from "../use_cases/update_profile";
import {AfterUserLogin} from "./after_user_login";
import {updateUserLastLogin} from "../use_cases/update_user_last_login";


const afterUserCreated = new AfterUserCreated(updateProfileUseCase);
const afterUserSignIn = new AfterUserLogin(updateUserLastLogin);
export {
    afterUserCreated,
    afterUserSignIn
}