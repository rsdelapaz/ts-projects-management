const registeredValidators = {};
export function Required(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign({}, registeredValidators[target.constructor.name], { [propName]: ['required'] });
}
export function PositiveNumber(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign({}, registeredValidators[target.constructor.name], { [propName]: ['positive'] });
}
export function validate(obj) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}
//# sourceMappingURL=validators.js.map