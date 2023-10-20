import * as forecastService from "./forcast.service.js";
import { successResponse } from "../../utils/response.js";

// 초실황 예보 데이터 관련 컨트롤러
export const currentDataController = {
  //TODO 초단기 실황 날씨 데이터 받는 Get 요청 (요청 지역 params로 요청)
  getCurrentData: async (req, res, next) => {
    try {
      // TODO 현재 실시간 위치를 구하는 로직  (kakaoMaps 사용)
      // 일단 고정값으로 서울특별시로 고정
      let curCity = "서울특별시";
      //service 로직
      let result = await forecastService.getCurrentData(curCity);
    
      return res.status(200).json(successResponse(`${curCity}지역의 현재 실시간 초실황 데이터 입니다.`,result,200));
    } catch (err) {
        next(err);
    }
  },
};

//초단기 예보 컨트롤러 위와 비슷함 (30분 주기로 데이터 업데이트 하기)

//단기 예보 컨트롤러 ( 3시간 주기로 데이터 업데이트 하기 )
