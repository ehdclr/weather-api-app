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

    if (!cityFullName) {
      logger.error("도시를 제대로 입력해주세요!");
      throw new NotFoundError("해당 도시를 찾을 수 없습니다!");
    }

    const cacheKey = `currentWeather_${cityFullName}`;
    let currentWeatherData = await getCacheData(cacheKey);

    if (!currentWeatherData) {
      currentWeatherData = await CurrentDataModel.findOne({
        cityName: cityFullName,
      }).sort({ fcstDate: -1, fcstTime: -1 });
      await setCacheData(cacheKey, currentWeatherData, 3600);
    }
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

    validate(currentDataSchema, result);
    logger.info("초단기 실황 데이터 응답에 성공하였습니다!");
    return result;
  } catch (err) {
    logger.error(`에러 메시지 : ${err.message}`);
    throw err;
  }
};

//초단기 서비스 데이터 받는 함수
export const getUtrSrtData = async (city) => {
  try {
    const SERVICE_KEY = process.env.WEATHER_API_SERVICE_KEY;
    const cityFullName = getCityFullName(city);

    if (!cityFullName) {
      logger.error("도시를 제대로 입력해주세요!");
      throw new NotFoundError("해당 도시를 찾을 수 없습니다!");
    }

    const cacheKey = `utrSrtData_${cityFullName}`;
    let utrSrtData = await getCacheData(cacheKey);

    if (!utrSrtData) {
      //캐시에 없다면 fetch 요청
      let { baseTime, baseDate } = getUrtShortApiDateAndTime();
      let { lat, lng } = getLatitudeAndLongitude(cityFullName);
      let { x, y } = dfs_xy_conv("toXY", lat, lng);
      const API_ENDPOINT = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${x}&ny=${y}`;
      const fetchedData = await fetchRequest.fetchData(API_ENDPOINT);

      console.log(baseTime, baseDate, "ㅋㅋ");

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

    validate(utrSrtDataSchema, result);
    logger.info("초단기 데이터를 불러오는데 성공했습니다.");
    return result;
  } catch (err) {
    logger.error(`에러 메시지 : ${err.message}`);
    throw err;
  }
};

//단기 서비스 데이터 받는 함수
export const getSrtTermData = async (city) => {
  try {
    const SERVICE_KEY = process.env.WEATHER_API_SERVICE_KEY;
    const cityFullName = getCityFullName(city);

    if (!cityFullName) {
      logger.error("도시를 제대로 입력해주세요!");
      throw new NotFoundError("해당 도시를 찾을 수 없습니다!");
    }

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

    validate(shortTermForecastDataSchema, resultObj);

    logger.info("단기 데이터 응답에 성공하였습니다!");
    return resultObj;
  } catch (err) {
    logger.error(`에러 메시지 : ${err.message}`);
    throw err;
  }
};

