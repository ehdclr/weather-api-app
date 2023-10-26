import logger from "../../config/logger.js";
import Admin from "../../models/admin.model.js";
import { Unauthorization } from "../../utils/httpErrors.js";
import validate from "../../utils/responseValidation.js";
import loginSchema from "./schema/login.schema.js";

export const login = async (username, password) => {
  //관리자 계정 로그인 로직 서비스
  if (!username || !password) {
    logger.error("아이디 비밀번호를 입력해주세요!");
    throw new Unauthorization("아이디 비밀번호를 입력해주세요!");
  }

  const admin = await Admin.findOne({ username, password });

  if (!admin) {
    logger.error("사용자 정보를 제대로 입력해주세요!");
    throw new Unauthorization("아이디 비밀번호가 틀렸습니다!");
  }

  const result = { username: admin.username };
  validate(loginSchema,result);

  logger.info(`${admin.username} 관리자님이 로그인하였습니다.`);
  return result;
};
