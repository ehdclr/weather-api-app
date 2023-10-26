import logger from "../config/logger.js";
import jwt from 'jsonwebtoken';
import { ForbiddenError, Unauthorization } from "../utils/httpErrors.js";

const authJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(authHeader){
    const token = authHeader.split(" ")[1];
    jwt.verify(token,process.env.JWT_KEY,(err,user) =>{
      if(err){
        throw new ForbiddenError("토큰이 유효하지 않습니다!");
      }
      req.user = user;
      logger.info(`${req.user.username} 관리자님이 로그인 중입니다.`);
      next();
    })
    
  }
  else{
    logger.info(`아이디 비밀번호가 필요합니다.`);
    throw new Unauthorization('권한이 없습니다!')
  }
};



export default authJwt;