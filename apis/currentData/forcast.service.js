//초단기 실황 서비스 데이터 받는 함수

import logger from "../../config/logger.js";
import CurrentDataModel from "../../models/current.model.js";
import { fetchCurrentWeatherData } from "../../utils/fetchData/currentWeatherData.js";
import fetchRequest from "../../utils/fetchData/fetchRequest.js";
import { getShortTermApiDateAndTime, getUrtShortApiDateAndTime } from "../../utils/getBaseTime.js";
import { NotFoundError } from "../../utils/httpErrors.js";
import { dfs_xy_conv } from "../../utils/location/locationConverter.js";
import {
  getLatitudeAndLongitude,
  getCityFullName,
} from "../../utils/location/locationUtils.js";

export const getCurrentData = async (city) => {
  try {
    //! Option )redis 캐시에서 받기
    //선택한 지역의 데이터 받기 (실시간 위치가 좋긴함) ->최근 데이터 받기 급
    let cityFullName = getCityFullName(city);

    let curData = await CurrentDataModel.findOne({
      cityName: cityFullName,
    }).sort({ baseDate: -1, baseTime: -1 });

    let { lat, lng } = getLatitudeAndLongitude(cityFullName);
    let { x, y } = dfs_xy_conv("toXY", lat, lng);

    if (!curData) {
      await fetchCurrentWeatherData(cityFullName, x, y); //데이터베이스 저장 (일단 고정값 넣기)
      //! Option ) 이안에 레디스로 저장하는 로직 있을 것임 
    }

    return curData;

    //TODO 데이터 가공하기 (스키마 구조 작성하기)
    //! Option ) AJV 응답 작성
  } catch (err) {
    throw err;
  }
};

//사실상 거의 안씀
//초단기 서비스 데이터 받는 함수  -> 새로 업데이트 한 값만 받으면 되기때문에 API로 바로 요청
export const getUtrSrtData = async (city) => {
  try {
    const SERVICE_KEY = process.env.WEATHER_API_SERVICE_KEY;
    let { baseTime, baseDate } = getUrtShortApiDateAndTime();
    //도시의 nx ny 받아서 고쳐야함
    let cityFullName = getCityFullName(city);
    let {lat,lng} = getLatitudeAndLongitude(cityFullName);
    let {x,y} = dfs_xy_conv("toXY",lat,lng);

    //! 캐시에 있다면, 캐시 데이터 불러오면됨
    //! 캐시에 없다면, 공공 api 요청 하면됨  얘는 baseTime이미 주기 정해놔서 괜찮음 1시간 주기로 캐싱처리

    const API_ENDPOINT = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${x}&ny=${y}`;
    const fetchedData = await fetchRequest.fetchData(API_ENDPOINT);

    if (!fetchedData || !fetchedData.response || !fetchedData.response.body) {
      logger.error("공공 날씨 API를 fetch에 실패하였습니다![초단기 데이터]"); // 에러 로깅
      throw new NotFoundError("데이터 요청에 실패하였습니다.");
    }
    const utrSrtDataItems = fetchedData.response.body.items.item;

    const groupedByFcstDateAndTime = utrSrtDataItems.reduce((acc, item) => {
      if (!acc[item.fcstDate]) {
        acc[item.fcstDate] = {};
      }
      if (!acc[item.fcstDate][item.fcstTime]) {
        acc[item.fcstDate][item.fcstTime] = [];
      }
      acc[item.fcstDate][item.fcstTime].push(item);
      return acc;
    }, {});

    const result = Object.entries(groupedByFcstDateAndTime).flatMap(
      ([fcstDate, timeGroup]) => {
        return Object.entries(timeGroup).map(([fcstTime, items]) => {
          const weatherData = items.map((item) => ({
            category: item.category,
            fcstValue: item.fcstValue,
          }));
          return { cityName: cityFullName, fcstDate, fcstTime, weatherData };
        });
      }
    );

    logger.info("초단기 데이터를 불러오는데 성공했습니다.");
    return result;
  } catch (err) {
    logger.error(`초단기 데이터 오류 : ${err.message}`);
    throw err;
  }
};

//공공 api 불러오는 함수 
//단기 서비스 데이터 받는 함수 -> 새로 업데이트 한 값만 받으면 되기 때문에 공공 API로 바로 요청
export const getSrtTermData = async(city) => {
  try {
    const SERVICE_KEY = process.env.WEATHER_API_SERVICE_KEY;
    let { baseTime, baseDate } = getShortTermApiDateAndTime();
    let cityFullName = getCityFullName(city);
    let {lat,lng} = getLatitudeAndLongitude(cityFullName);
    console.log(cityFullName);
    console.log(lat,lng);
    let {x,y} = dfs_xy_conv("toXY",lat,lng);

    //! 캐시에 없다면, api 요청하고 

    const API_ENDPOINT = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${x}&ny=${y}`;
    const fetchedData = await fetchRequest.fetchData(API_ENDPOINT);

    if (!fetchedData || !fetchedData.response || !fetchedData.response.body) {
      logger.error("공공 날씨 API를 fetch에 실패하였습니다![초단기 데이터]");
      throw new NotFoundError("데이터 요청에 실패하였습니다.");
    }

    const shortTermData = fetchedData.response.body.items.item;

    //! 캐싱 처리 (redis 사용) -> 저장 -> 얘는 3시간 단위로 api 갱신되니까 3시간 ttl 주면됨

    // 날짜와 예보 시간별로 데이터를 정리
    let resultList = [];

    shortTermData.forEach(item => {
      const { fcstDate, fcstTime, category, fcstValue } = item;

      let existingData = resultList.find(data => data.fcstDate === fcstDate && data.fcstTime === fcstTime);

      if (!existingData) {
        existingData = {
          cityName: cityFullName,
          fcstDate,
          fcstTime,
          weatherData: []
        };
        resultList.push(existingData);
      }

      existingData.weatherData.push({ category, fcstValue });
    });

    return resultList;

  } catch (err) {
    logger.error(`초단기 데이터 오류 : ${err.message}`);
    throw err;
  }
};


//일자별 날짜 데이터 (단기 일보 데이터에서 5일치 가져옴) -> 일단 


//오늘 하루 00시부터 24시까지 시간대별 날씨 정보 보여주는 것
// 초실황일보(데이터베이스에 누적저장한것 (현재시간까지)) + 단기일보 합친거 보여주면될듯 -> 여기서 겹치는 시간 빼고
