import {OperationValues, ProcessService} from "../process_service";
import {ProcessIdentifier} from "../../../../shared/domain/process_identifier";
import {IAuthRepo} from "../../repos/i_auth_repo";

export class DefaultProcessService implements ProcessService {
    private authRepo: IAuthRepo
    constructor(authRepo: IAuthRepo) {
        this.authRepo = authRepo;
    }
    generateIdentifier(): string {
        return new ProcessIdentifier().toValue();
    }

    generateOtp(): string {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

    async checkOperationValid(userId: string, userDetails: OperationValues): Promise<boolean> {
        try {
            let requestDetails = await this.getOperationValues(userId);
            return JSON.stringify(userDetails) === JSON.stringify(requestDetails)
        } catch (e) {
        }
        return false;
    }

    async getOperationValues(userId: string): Promise<OperationValues> {
        return await this.authRepo.getVerificationDetails(userId);
    }
}

