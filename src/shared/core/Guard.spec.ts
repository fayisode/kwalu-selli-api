import {Guard, GuardResponse} from './Guard'
import {Result} from './Result'

describe('guard', () => {

    let result: Result<GuardResponse>;
    let argName = 'testArgument'
    let secondaryArgName = 'secondaryTestArgument'

    beforeEach(() => {
        result = null;
    });

    describe('combined results', () => {

        it('knows that two successful results equates to success', () => {
            result = Guard.combine([Result.ok<any>(), Result.ok<any>()]);
            expect(result.isSuccess).toBeTruthy();
        });

        it('knows that one success, one failure equates to overall failure', () => {
            let failureMessage = 'This one failed';
            result = Guard.combine([Result.ok<any>(), Result.fail<any>(failureMessage)]);
            expect(result.isSuccess).toBeFalsy();
            expect(result.isFailure).toBeTruthy();
            expect(result.getErrorValue()).toEqual(failureMessage);
        });

    });

    describe('against null or undefined', () => {

        it('knows that value provided equates to success', () => {
            result = Guard.againstNullOrUndefined(true, argName);
            expect(result.isSuccess).toBeTruthy();
        });

        it('knows that null value equates to failure', () => {
            result = Guard.againstNullOrUndefined(null, argName);
            expect(result.isSuccess).toBeFalsy();
            expect(result.getErrorValue()).toEqual(`${argName} is null or undefined`);
        });

        it('knows that undefined value equates to failure', () => {
            result = Guard.againstNullOrUndefined(undefined, argName);
            expect(result.isSuccess).toBeFalsy();
            expect(result.getErrorValue()).toEqual(`${argName} is null or undefined`);
        });

        it('knows that empty string still equates to success', () => {
            result = Guard.againstNullOrUndefined('', argName);
            expect(result.isSuccess).toBeTruthy();
        });

    })

    describe('against null or undefined bulk', () => {
        it('knows that values provided equates to success', () => {
            result = Guard.againstNullOrUndefinedBulk([
                {argumentName: argName, argument: true},
                {argumentName: secondaryArgName, argument: 12}
            ]);
            expect(result.isSuccess).toBeTruthy();
        });

        it('knows that a single null value equates to failure', () => {
            result = Guard.againstNullOrUndefinedBulk([
                {argumentName: argName, argument: null},
                {argumentName: secondaryArgName, argument: 12}
            ]);

            expect(result.isSuccess).toBeFalsy();
            expect(result.getErrorValue()).toEqual(`${argName} is null or undefined`);
        });

        it('knows that a single undefined value equates to failure', () => {
            result = Guard.againstNullOrUndefinedBulk([
                {argumentName: argName, argument: undefined},
                {argumentName: secondaryArgName, argument: 12}
            ]);

            expect(result.isSuccess).toBeFalsy();
            expect(result.getErrorValue()).toEqual(`${argName} is null or undefined`);
        });

    })

    describe('IsAlphabetic', () => {
        test('should return success when the string is alphabetic', () => {
            result = Guard.againstNotAlphabetical('test', argName);
            expect(result.isSuccess).toBeTruthy();
        })

        test('should return failure when the string is not alphabetic', () => {
            result = Guard.againstNotAlphabetical('1231344', argName);
            expect(result.isFailure).toBeTruthy();
            result = Guard.againstNotAlphabetical('test1', argName);
            expect(result.isFailure).toBeTruthy();
        })
    })

    describe('Alphanumeric', () => {
        test('should return success when the string is alphanumeric', () => {
            result = Guard.againstNotAlphaNumeric('1231344a', argName);
            expect(result.isSuccess).toBeTruthy();
        })
        test('`should get a failure when string is not alphanumeric', () => {
            result = Guard.againstNotAlphaNumeric('@', argName);
            expect(result.isFailure).toBeTruthy();
        })

    })
    describe('Special character', function () {
        test('should return success when the string is special character', () => {
            result = Guard.againstNotSpecialChar('*&^^*&', argName);

            expect(result.isSuccess).toBeTruthy();
        })
        test('`should get a failure when string is not  special character', () => {
            result = Guard.againstNotSpecialChar('1231344', argName);

            expect(result.isFailure).toBeTruthy();
        })
    });

    describe('Numeric', function () {
        test('should know the value is a valid numeric value', () => {
            result = Guard.againstNotNumeric('123131', argName);
            expect(result.isSuccess).toBeTruthy();
        })

        test('should know the value is not a valid numeric value', () => {
            result = Guard.againstNotNumeric('test', argName);
            expect(result.isFailure).toBeTruthy();

            result = Guard.againstNotNumeric('1*12', argName);
            expect(result.isFailure).toBeTruthy();

            result = Guard.againstNotNumeric('1123t', argName);
            expect(result.isFailure).toBeTruthy();
        });
    });

    describe('against invalid email', () => {
        it('knows that valid email equates to success', () => {
            result = Guard.againstInvalidEmail('test@test.com', argName);
            expect(result.isSuccess).toBeTruthy();
        })

        it('knows that invalid email equates to failure', () => {
            result = Guard.againstInvalidEmail('test', argName);
            expect(result.isFailure).toBeTruthy();

            result = Guard.againstInvalidEmail('test@test', argName);
            expect(result.isFailure).toBeTruthy();
        })
    })
})