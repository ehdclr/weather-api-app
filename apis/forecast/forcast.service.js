//초단기 실황 서비스 데이터 받는 함수
import logger from "../../config/logger.js";
import CurrentDataModel from "../../models/current.model.js";
import { getCacheData, setCacheData } from "../../utils/cache/redisCache.js";
import { fetchCurrentWeatherData } from "../../utils/fetchData/currentWeatherData.js";
import fetchRequest from "../../utils/fetchData/fetchRequest.js";
import {
  getShortTermApiDateAndTime,
  getUrtShortApiDateAndTime,
} from "../../utils/getBaseTime.js";
import { NotFoundError } from "../../utils/httpErrors.js";
import { dfs_xy_conv } from "../../utils/location/locationConverter.js";
import {
  getLatitudeAndLongitude,
  getCityFullName,
} from "../../utils/location/locationUtils.js";
import validate from "../../utils/responseValidation.js";
import currentDataSchema from "./schema/currentData.schema.js";
import shortTermForecastDataSchema from "./schema/shortTermData.schema.js";
import utrSrtDataSchema from "./schema/utrSrtData.schema.js";

export const getCurrentData = async (city) => {
  try {
    let cityFullName = getCityFullName(city);
    const cacheKey = `currentWeather_${cityFullName}`;
    let currentWeatherData = await getCacheData(cacheKey);

    // 캐시 데이터가 없으면 db에서 가져오기
    if (!currentWeatherData) {
      currentWeatherData = await CurrentDataModel.findOne({
        cityName: cityFullName,
      }).sort({ fcstDate: -1, fcstTime: -1 });
      await setCacheData(cacheKey,currentWeatherData,3600);
    }
    // 데이터베이스에도 없다면, 다시 fetch 하는 로직
    if (!currentWeatherData) {
      let { lat, lng } = getLatitudeAndLongitude(cityFullName);
      let { x, y } = dfs_xy_conv("toXY", lat, lng);
      await fetchCurrentWeatherData(cityFullName, x, y);
      currentWeatherData = await CurrentDataModel.findOne({
        cityName: cityFullName,
      }).sort({ fcstDate: -1, fcstTime: -1 });

    }

    
    const result = {
      cityName: currentWeatherData.cityName,
      forecast: {
        [currentWeatherData.fcstDate]: {
          [currentWeatherData.fcstTime]: {
            ...currentWeatherData.weatherData,
          },
        },
      },
    };

    //ajv 응답객체 검증 
    validate(currentDataSchema,result);

    logger.info("초단기 실황 데이터 응답에 성공하였습니다!");
    return result;
  } catch (err) {
    throw err;
  }
};

//초단기 서비스 데이터 받는 함수  -> 새로 업데이트 한 값만 받으면 되기때문에 API로 바로 요청
export const getUtrSrtData = async (city) => {
  try {
    const SERVICE_KEY = process.env.WEATHER_API_SERVICE_KEY;
    const cityFullName = getCityFullName(city);
    const cacheKey = `utrSrtData_${cityFullName}`;
    let utrSrtData = await getCacheData(cacheKey);

    if (!utrSrtData) {
      //캐시에 없다면 fetch 요청
      let { baseTime, baseDate } = getUrtShortApiDateAndTime();
      let { lat, lng } = getLatitudeAndLongitude(cityFullName);
      let { x, y } = dfs_xy_conv("toXY", lat, lng);
      const API_ENDPOINT = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${x}&ny=${y}`;
      const fetchedData = await fetchRequest.fetchData(API_ENDPOINT);

      if (!fetchedData || !fetchedData.response || !fetchedData.response.body) {
        logger.error("공공 날씨 API를 fetch에 실패하였습니다![초단기 데이터]"); // 에러 로깅
        throw new NotFoundError("데이터 요청에 실패하였습니다.");
      }

      utrSrtData = fetchedData.response.body.items.item;
      await setCacheData(cacheKey, utrSrtData, 3600);
    }
    const utrSrtDataItems = utrSrtData;
    const groupedByFcstDateAndTime = utrSrtDataItems.reduce((acc, item) => {
      if (!acc[item.fcstDate]) {
        acc[item.fcstDate] = {};
      }
      if (!acc[item.fcstDate][item.fcstTime]) {
        acc[item.fcstDate][item.fcstTime] = {};
      }
      acc[item.fcstDate][item.fcstTime][item.category] = item.fcstValue;
      return acc;
    }, {});

    const result = {
      cityName: cityFullName,
      forecast: groupedByFcstDateAndTime,
    };

    validate(utrSrtDataSchema,result);
    logger.info("초단기 데이터를 불러오는데 성공했습니다.");
    return result;
  } catch (err) {
    logger.error(`초단기 데이터 오류 : ${err.message}`);
    throw err;
  }
};

//단기 서비스 데이터 받는 함수 -> 새로 업데이트 한 값만 받으면 되기 때문에 공공 API로 바로 요청
export const getSrtTermData = async (city) => {
  try {
    const SERVICE_KEY = process.env.WEATHER_API_SERVICE_KEY;
    const cityFullName = getCityFullName(city);
    const cacheKey = `srtTermData_${cityFullName}`;
    let srtTermData = await getCacheData(cacheKey);

    //! 캐시에 없다면, api 요청하고
    if (!srtTermData) {
      let { baseTime, baseDate } = getShortTermApiDateAndTime();
      let { lat, lng } = getLatitudeAndLongitude(cityFullName);
      let { x, y } = dfs_xy_conv("toXY", lat, lng);
      const API_ENDPOINT = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${x}&ny=${y}`;
      const fetchedData = await fetchRequest.fetchData(API_ENDPOINT);

      if (!fetchedData || !fetchedData.response || !fetchedData.response.body) {
        logger.error("공공 날씨 API를 fetch에 실패하였습니다![초단기 데이터]");
        throw new NotFoundError("데이터 요청에 실패하였습니다.");
      }

      srtTermData = fetchedData.response.body.items.item; // API에서 가져온 데이터를 변수에 할당

      // 데이터를 가져왔으면 캐시에 저장 (예: 3시간 동안 유효한 캐시)
      setCacheData(cacheKey, srtTermData, 10800); // 10800초(3시간) 동안 유효한 캐시
    }

    const shortTermData = srtTermData;
    let resultObj = {
      cityName: cityFullName,
      forecast: {},
    };

    shortTermData.map((item) => {
      const { fcstDate, fcstTime, category, fcstValue } = item;

      if (!resultObj.forecast[fcstDate]) {
        resultObj.forecast[fcstDate] = {};
      }

      if (!resultObj.forecast[fcstDate][fcstTime]) {
        resultObj.forecast[fcstDate][fcstTime] = {};
      }

      resultObj.forecast[fcstDate][fcstTime][category] = fcstValue;
    });

    validate(shortTermForecastDataSchema,resultObj);

    logger.info("단기 데이터 응답에 성공하였습니다!");
    return resultObj;
  } catch (err) {
    logger.error(`단기 데이터 오류 : ${err.message}`);
    throw err;
  }
};


//TODO 일자별 날짜 데이터 (단기 일보 데이터에서 5일치 가져옴) -> 일단
//일자별 최고 기온 최저 기온 최고기온은 1700에 최저기온은 0600에 나옴 


//TODO 오늘 하루 00시부터 24시까지 시간대별 날씨 정보 보여주는 것
// 초실황일보(데이터베이스에 누적저장한것 (현재시간까지)) + 단기일보 합친거 보여주면될듯 -> 여기서 겹치는 시간 빼고


//TODO 내일의 날씨 정보를 카카오톡으로 알림 보내는 로직 
//최저 기온 최고기온을 보내주고, 강수확률 6~12시 사이의 강수확률과 SKY 보여줌 -> 요약 하기 