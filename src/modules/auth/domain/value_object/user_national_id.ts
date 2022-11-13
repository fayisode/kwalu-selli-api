import {ValueObject} from "../../../../shared/domain/ValueObject";
import {Result} from "../../../../shared/core/Result";
import {Guard} from "../../../../shared/core/Guard";

interface UserNationalIdProps {
    value: string;
}

export class UserNationalId extends  ValueObject<UserNationalIdProps>{
   public static idLength: number = 13;

    private constructor(props: UserNationalIdProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }


    public static create(props: UserNationalIdProps): Result<UserNationalId> {
        let againstNullOrUndefined = Guard.againstNullOrUndefined(props.value, 'id');
        if(againstNullOrUndefined.isFailure){
            return Result.fail<UserNationalId>(againstNullOrUndefined.getErrorValue());
        }

        const result = Guard.combine([
            Guard.againstAtLeast(this.idLength, props.value),
            Guard.againstAtMost(this.idLength, props.value),
            Guard.againstNotNumeric(props.value, 'id')
        ])

        if(result.isFailure){
            return Result.fail<UserNationalId>(result.getErrorValue())
        }




        return Result.ok(new UserNationalId(props));
    }
}
