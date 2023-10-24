import Ajv from "ajv";
import logger from "../config/logger.js";

const ajv = new Ajv();

const validate = (schema, data) => {
  const validateFunction = ajv.compile(schema);
  const valid = validateFunction(data);
  if (!valid) {
    logger.error(`응답 객체 검증에 실패했습니다. ${validationFunction.errors[0].message}`)
    throw new Error(validateFunction.errors[0].message);
  }

  logger.info("응답 객체 검증 완료!");
};

export default validate;
