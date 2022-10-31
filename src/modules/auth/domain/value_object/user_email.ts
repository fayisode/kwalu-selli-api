import {ValueObject} from "../../../../shared/domain/ValueObject";
import {Result} from "../../../../shared/core/Result";
import {Guard} from "../../../../shared/core/Guard";


export interface UserEmailProps {
    value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {

    get value(): string {
        return this.props.value;
    }

    private constructor(props: UserEmailProps) {
        super(props);
    }


    private static format(email: string): string {
        return email.trim().toLowerCase();
    }

    public static create(email: UserEmailProps): Result<UserEmail> {
        let againstNullOrUndefined = Guard.againstNullOrUndefined(email.value, 'email');
        if(againstNullOrUndefined.isFailure) {
            return Result.fail<UserEmail>(againstNullOrUndefined.getErrorValue());
        }

        const result = Guard.combine([

            Guard.againstInvalidEmail(email.value, 'email')
        ])

        if (result.isFailure) {
            return Result.fail<UserEmail>(result.getErrorValue())
        }
        return Result.ok<UserEmail>(
            new UserEmail({value: this.format(email.value)})
        );

    }
}