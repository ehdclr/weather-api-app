import logger from "../config/logger.js";

const authSession = (req, res, next) => {
  if (req.session.admin) {
    logger.info(`${req.session.admin} 관리자님이 로그인 하셨습니다.`);
    next();
  } else {
    logger.info(`아이디 비밀번호가 필요합니다.`);
    next();
  }
};



export default authSession;