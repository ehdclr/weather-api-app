//초단기 실황 서비스 데이터 받는 함수

import CurrentDataModel from "../../models/current.model.js";
import { fetchCurrentWeatherData } from "../../utils/currentWeatherData.js";
import { getCurrentApiDateAndTime } from "../../utils/getBaseTime.js";

export const getCurrentData = async (city) => {
  try {
     //! Option )redis 캐시에서 받기
    //TODO 초실황 데이터 baseDate, baseTime 구하기
    let { baseTime, baseDate } = getCurrentApiDateAndTime();

    console.log(baseTime,baseDate);
    //선택한 지역의 데이터 받기 (실시간 위치가 좋긴함)
    let curData = await CurrentDataModel.findOne({
      cityName: city,
      baseDate: baseDate,
      baseTime: baseTime,
    });


    //현재 위치의 baseTime baseDate의 데이터가 없다면?
    if (!curData) {
    await fetchCurrentWeatherData(city, "55", "137"); //데이터베이스 저장 (일단 고정값 넣기)
      //TODO 현재 도시의 대략적인 nx ny 값 넣기 (동적으로 바꾸게 수정해야함)
    
    }

    // 가장 최근 데이터 가져오기 (그 도시중 mysql로치면 order 로 쳐서 limit 1준것)
    return await CurrentDataModel.findOne({cityName:city}).sort({baseDate:-1,baseTime:-1});
    //TODO 데이터 가공하기 (스키마 구조 작성하기)
    //! Option ) AJV 응답 작성 
    
  } catch (err) {
    throw new err();
  }
 
};

//초단기 실황 서비스로 누적한 데이터 모두 받는 함수(누적 데이터 받기)

//초단기 서비스 데이터 받는 함수 (데이터 베이스에 저장된것)

//단기 서비스 데이터 받는 함수
