import {ValueObject} from "../../../../shared/domain/ValueObject";
import {Result} from "../../../../shared/core/Result";
import {Guard} from "../../../../shared/core/Guard";

interface UserNameProps{
    value: string
}

export class UserName extends  ValueObject<UserNameProps>{
    static maxLength: number = 30;
    static minLength: number = 2;
    constructor(name: UserNameProps) {
        super(name);
    }

    get value(): string {
        return this.props.value;
    }

    private static format(email: string): string {
        let trim = email.trim();
        return trim.charAt(0).toUpperCase() + trim.slice(1);
    }

    static  create (name: UserNameProps): Result<UserName>{
        let againstNullOrUndefined = Guard.againstNullOrUndefined(name.value, 'name');
        if(againstNullOrUndefined.isFailure){
            return Result.fail<UserName>(againstNullOrUndefined.getErrorValue());
        }

        let result = Guard.combine([
            Guard.againstAtLeast(this.minLength, name.value),
            Guard.againstAtMost(this.maxLength, name.value)
        ]);

        if (result.isFailure) {
            return Result.fail(result.getErrorValue());
        }
        return Result.ok(new this({value: this.format(name.value)}));
    }
}