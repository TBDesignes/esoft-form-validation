import Validator from './validator.js';

export function checker(scheme) {
    const checker = {};
    checker.onSuccess = action => {
        checker.success = action;
        return checker;
    };
    checker.onFail = action => {
        checker.fail = action;
        return checker;
    };
    checker.afterValidation = action => {
        checker.after = action;
        return checker;
    }
    checker.run = data => {
        const validator = new Validator();
        checker.succeed = validator.isValid(scheme, data);
        if (checker.succeed && checker.after) {
            checker.succeed = checker.after(data);
        }
        if (checker.succeed) {
            checker.success(data);
        } else {
            checker.fail(data, validator.Errors);
        }
    };
    return checker;
}