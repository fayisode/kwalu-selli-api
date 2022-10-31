import {ProcessService} from "../process_service";
import {DefaultProcessService} from "./default_process_service";
import {IAuthRepo} from "../../repos/i_auth_repo";
import {Mock} from "moq.ts";

describe('ProcessService', () => {
    let service: ProcessService;

    beforeEach(() => {
        service = new DefaultProcessService(mockAuthRepo().object());
    });

    it('should generate a valid identifier', () => {
        const identifier = service.generateIdentifier();
        expect(identifier).toBeDefined();
        expect(identifier.length).toBe(36);
    });

    it('should generate a valid otp', () => {
        const otp = service.generateOtp();
        expect(otp).toBeDefined();
        expect(otp.length).toBe(4);
    });
})

function mockAuthRepo(){
    return new Mock<IAuthRepo>()
}