import {Either, Result} from "../../../../shared/core/Result";
import {UpdateProfileError} from "./update_profile_error";
import {AppError} from "../../../../shared/core/AppError";

export type UpdateProfileResponse = Either<UpdateProfileError.ValuePropsError
    | AppError.UnexpectedError,
    Result<any>| Result<void>>