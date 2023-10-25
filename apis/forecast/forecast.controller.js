import * as forecastService from "./forcast.service.js";
import { successResponse } from "../../utils/response.js";

// 초실황 예보 데이터 관련 컨트롤러
export const forecastController = {
  getCurrentData: async (req, res, next) => {
    try {
      let curCity = req.query.city;
      //service 로직
      let result = await forecastService.getCurrentData(curCity);
      return res
        .status(200)
        .json(
          successResponse(
            `${curCity}지역의 현재 실시간 초실황 데이터 입니다.`,
            result,
            200
          )
        );
    } catch (err) {
      next(err);
    }
  },

  //초단기 예보 컨트롤러 위와 비슷함
  getUtrSrtData: async (req, res, next) => {
    try {
      let curCity = req.query.city;
      let result = await forecastService.getUtrSrtData(curCity);

      return res
        .status(200)
        .json(
          successResponse(
            `${curCity}지역의 현재 초단기 데이터 입니다.`,
            result,
            200
          )
        );
    } catch (err) {
      next(err);
    }
  },

  //단기 예보 컨트롤러 ( 3시간 주기로 데이터 업데이트 하기 )
  getSrtTermData: async (req, res, next) => {
    try {
      let curCity = req.query.city;
      let result = await forecastService.getSrtTermData(curCity);

      return res
        .status(200)
        .json(
          successResponse(
            `${curCity}지역의 단기 예보 데이터 입니다.`,
            result,
            200
          )
        );
    } catch (err) {
      next(err);
    }
  },


};
