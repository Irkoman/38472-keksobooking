const DEFAULT_CONVERTER = (value) => value;

const exists = (value) => {
  switch (typeof value) {
    case `number`:
      return !Number.isNaN(value);
    case `string`:
      return value.length > 0;
    default:
      return value;
  }
};

const printError = (field, value, message) => ({field, value, message});

const validateField = (data, field, {required = false, converter = DEFAULT_CONVERTER, assertions}) => {
  const value = data[field];

  if (!value && !required) {
    return [];
  }

  const errors = [];

  try {
    if (exists(value)) {
      const convertedValue = converter(value);

      for (const assertion of assertions) {
        if (!(assertion.assert(convertedValue, data))) {
          errors.push(printError(field, value, assertion.message));
        }
      }
    } else if (required) {
      errors.push(printError(field, value, `обязательно`));
    }
  } catch (error) {
    errors.push(printError(field, value, error.message));
  }

  return errors;
};

const validate = (data, schema) => {
  const errors = [];

  for (const key of Object.keys(schema)) {
    for (const error of validateField(data, key, schema[key])) {
      errors.push(error);
    }
  }

  return errors;
};

module.exports = {
  validate
};
