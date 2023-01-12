export function validator(data, config) {
  const errors = {};
  function validate(validateMethods, data, config) {
    let statusValidate;
    switch (validateMethods) {
      case "isRequired":
        statusValidate = data.trim() === "";

        break;
      case "isEmail": {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(data);

        break;
      }
      case "isCapitalSymbol": {
        const capitalRegExp = /[A-Z]+/g;
        statusValidate = !capitalRegExp.test(data);

        break;
      }
      case "isContainDigit": {
        const digitRegExp = /\d+/g;
        statusValidate = !digitRegExp.test(data);

        break;
      }
      case "min": {
        statusValidate = data.length < config.value;

        break;
      }
      default:
        break;
    }
    if (statusValidate) return config.message;
  }
  for (const fieldName in data) {
    for (const validateMethods in config[fieldName]) {
      const error = validate(
        validateMethods,
        data[fieldName],
        config[fieldName][validateMethods]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}