import Ajv from 'ajv';

const ajv = new Ajv();

const validate = (schema, data) => {
  const validateFunction = ajv.compile(schema);
  const valid = validateFunction(data);
  if (!valid) {
    throw new Error(validateFunction.errors[0].message);
  }
};

export default validate;
