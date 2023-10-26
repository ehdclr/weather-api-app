import { successResponse } from "../../utils/response.js";
import * as adminService from "./admin.service.js";
import jwt from "jsonwebtoken";

export const adminController = {
  login: async (req, res, next) => {
    try {
      //관리자 계정 로그인
      const { username, password } = req.body;
      const token = await adminService.login(username, password);

      return res
        .status(200)
        .json(
          successResponse(
            `${username} 관리자님의 로그인에 성공하였습니다`,
            { token },
            200
          )
        );
    } catch (err) {
      next(err);
    }
  },
};
