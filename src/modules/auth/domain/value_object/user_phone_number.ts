import {ValueObject} from "../../../../shared/domain/ValueObject";
import {Result} from "../../../../shared/core/Result";
import {Guard} from "../../../../shared/core/Guard";

interface UserPhoneNumberProps {
    value: string
}

export class UserPhoneNumber extends ValueObject<UserPhoneNumberProps> {
    constructor(props: UserPhoneNumberProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    static create(props: UserPhoneNumberProps): Result<UserPhoneNumber> {
        let againstNullOrUndefined = Guard.againstNullOrUndefined(props.value, 'phone number');
        if(againstNullOrUndefined.isFailure) {
            return Result.fail<UserPhoneNumber>(againstNullOrUndefined.getErrorValue());
        }

        const result = Guard.combine([
            Guard.againstAtLeast(8, props.value),
            Guard.againstAtMost(8, props.value),
            Guard.againstNotNumeric(props.value, 'phone number')
        ])

        if (result.isFailure) {
            return Result.fail<UserPhoneNumber>(result.getErrorValue())
        }

        return Result.ok<UserPhoneNumber>(new UserPhoneNumber(props));
    }
}