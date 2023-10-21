import * as forecastService from "./forcast.service.js";
import { successResponse } from "../../utils/response.js";

// 초실황 예보 데이터 관련 컨트롤러
export const forecastController = {
  //TODO 초단기 실황 날씨 데이터 받는 Get 요청 (요청 지역 params로 요청)
  getCurrentData: async (req, res, next) => {
    try {
      // TODO 현재 실시간 위치를 구하는 로직  (kakaoMaps 사용)
      // 일단 고정값으로 서울특별시로 고정
      // let curCity = "서울특별시";
      let curCity = req.params.city;

      //service 로직
      let result = await forecastService.getCurrentData(curCity);

      //TODO 데이터 검증하는 로직 (validation)
      //TODO

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

  //TODO 초단기 날씨 데이터 받는 요청
  //초단기 예보 컨트롤러 위와 비슷함 (30분 주기로 데이터 업데이트 하기)
  getUtrSrtData: async (req, res, next) => {
    try {
      let curCity = "서울특별시";

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

  //TODO 단기 날씨 데이터 받는 요청
  //단기 예보 컨트롤러 ( 3시간 주기로 데이터 업데이트 하기 )

  getSrtTermData: async (req, res, next) => {
    try {
      let curCity = req.params.city;
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
