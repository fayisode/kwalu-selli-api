
export interface ProcessService{
    generateIdentifier(): string;
    generateOtp(): string;
    getOperationValues(userId: string):Promise<OperationValues>;
    checkOperationValid(userId: string, values: OperationValues): Promise<boolean>;
}



export interface OperationValues{
    process_name: string;
    otp: string;
    identifier: string;
    time: Date;
    type: string;
}