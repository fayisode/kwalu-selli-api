import {Entity} from "../../../../shared/domain/Entity";
import {UserEmail, UserName, UserNationalId, UserPhoneNumber} from "../value_object/value_object";
import {Result} from "../../../../shared/core/Result";
import {UniqueEntityID} from "../../../../shared/domain/UniqueEntityID";

interface UserProfileProps {
    firstName: Result<UserName>;
    lastName: Result<UserName>;
    avatar: string;
    location: string;
    phone: Result<UserPhoneNumber>;
    email: Result<UserEmail>;
    nationalId: Result<UserNationalId>;
    createdDate?: Date;
    updatedDate?: Date;
}

export class UserProfile extends Entity<UserProfileProps> {
    constructor(props: UserProfileProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    get firstName(): UserName {
        return this.props.firstName.getValue();
    }

    get lastName(): UserName {
        return this.props.lastName.getValue();
    }

    get avatar(): string {
        return this.props.avatar;
    }

    get location(): string {
        return this.props.location;
    }

    get phone(): UserPhoneNumber {
        return this.props.phone.getValue();
    }

    get email(): UserEmail {
        return this.props.email.getValue();
    }

    get nationalId(): UserNationalId {
        return this.props.nationalId.getValue();
    }

    static create(props: UserProfileProps, id?: UniqueEntityID): Result<UserProfile>{
        const result = Result.combine([
            props.firstName,
            props.lastName,
            props.phone,
            props.email,
            props.nationalId
            ])

        if(result.isFailure){
            return Result.fail<UserProfile>(result.getErrorValue())
        }
        let updatedProps = {
            ...props,
        };
        if(!id){
            updatedProps = {
                ...updatedProps,
                createdDate: new Date(),
                updatedDate: new Date()
            }
        }

        return Result.ok<UserProfile>(new UserProfile(updatedProps,id))
    }
}