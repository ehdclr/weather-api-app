import { Unauthorization } from "../../utils/httpErrors.js";
import { successResponse } from "../../utils/response.js";
import * as adminService from "./admin.service.js";

export const adminController = {
  login: async (req, res, next) => {
    try {
      //관리자 계정 로그인
      const { username, password } = req.body;
      const result = await adminService.login(username, password);

      req.session.admin = result;

      return res
        .status(200)
        .json(
          successResponse(
            `${username} 관리자님의 로그인에 성공하였습니다`,
            result,
            200
          )
        );
    } catch (err) {
      next(err);
    }
  },
  logout: async (req, res, next) => {
    try {
      if (!req.session.admin) {
        throw new Unauthorization("로그인한 세션이 없습니다.");
      }
      const adminName = req.session.admin.username;
      req.session.destroy();
      res.clearCookie("sid");
      return res
        .status(200)
        .json(
          successResponse(
            `${adminName} 관리자님이 로그아웃에 성공하였습니다.`,
            undefined,
            200
          )
        );
    } catch (err) {
      next(err);
    }
  },
};
