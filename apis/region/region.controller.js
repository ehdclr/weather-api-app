import { Unauthorization } from "../../utils/httpErrors.js";
import { successResponse } from "../../utils/response.js";
import * as regionService from "./region.service.js";

export const regionController = {
  //수집할 지역 추가 컨트롤러
  addRegion: async (req, res, next) => {
    try {
      if (!req.session.admin) {
        throw new Unauthorization("관리자 로그인이 필요합니다.");
      }
      let curCity = req.body.city;
      let result = await regionService.addRegion(curCity);
      return res
        .status(201)
        .json(
          successResponse(`${curCity}의 지역을 추가 수집합니다.`, result, 201)
        );
    } catch (err) {
      next(err);
    }
  },

  getRegions: async (req, res, next) => {
    try {
      let result = await regionService.getRegions();
      return res
        .status(200)
        .json(successResponse(`수집할 지역들의 목록입니다`, result, 200));
    } catch (err) {
      next(err);
    }
  },

  deleteRegion: async (req, res, next) => {
    try {
      if (!req.session.admin) {
        throw new Unauthorization("관리자 로그인이 필요합니다.");
      }
      const city = req.body.city;

      //수집 지역을 삭제하는 로직
      const result = await regionService.deleteRegion(city);

      return res
        .status(200)
        .json(successResponse(`${result} 도시 삭제 완료.`, undefined, 200));
    } catch (err) {
      next(err);
    }
  },
};
