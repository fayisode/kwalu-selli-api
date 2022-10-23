import {UpdateUserLastLoginUseCase} from "./update_user_last_login_use_case";
import {authRepo} from "../../repos/implementation";

const updateUserLastLogin = new UpdateUserLastLoginUseCase(authRepo);

export {
    updateUserLastLogin
}