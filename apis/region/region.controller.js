import { successResponse } from "../../utils/response.js";
import * as regionService from "./region.service.js";

export const regionController = {
  //수집할 지역 추가 컨트롤러
  addRegion: async (req, res, next) => {
    try {
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
};
