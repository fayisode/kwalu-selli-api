import {UpdateProfileUseCase} from "./update_profile_use_case";
import {authRepo} from "../../repos/implementation";

const updateProfileUseCase = new UpdateProfileUseCase(authRepo)

export {
    updateProfileUseCase,
}