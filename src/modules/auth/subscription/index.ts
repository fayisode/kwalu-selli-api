import {AfterUserCreated} from "./after_user_created";
import {updateProfileUseCase} from "../use_cases/update_profile";


const afterUserCreated = new AfterUserCreated(updateProfileUseCase);

export {
    afterUserCreated
}