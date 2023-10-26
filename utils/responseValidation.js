import Ajv from "ajv";
import logger from "../config/logger.js";
import { Unauthorization } from "./httpErrors.js";

const ajv = new Ajv();

const validate = (schema, data) => {
  const validateFunction = ajv.compile(schema);
  const valid = validateFunction(data);
  if (!valid) {
    const validationErrors = validateFunction.errors.map(
      (error) => error.message
    );
    logger.error(
      `응답 객체 검증에 실패했습니다. 오류: ${validationErrors.join(", ")}`
    );
    throw new Unauthorization(
      `응답 객체 검증에 실패했습니다. 오류: ${validationErrors.join(", ")}`
    );
  }

  logger.info("응답 객체 검증 완료!");
  return valid;
};

export default validate;
