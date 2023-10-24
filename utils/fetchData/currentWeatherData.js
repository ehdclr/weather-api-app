import logger from "../../config/logger.js";
import CurrentDataModel from "../../models/current.model.js";
import fetchRequest from "./fetchRequest.js";
import { getCurrentApiDateAndTime } from "../getBaseTime.js";
import { setCacheData } from "../cache/redisCache.js";

export const fetchCurrentWeatherData = async (city, nx, ny) => {
  try {
    const SERVICE_KEY = process.env.WEATHER_API_SERVICE_KEY;
    let { baseTime, baseDate } = getCurrentApiDateAndTime();
    const API_ENDPOINT = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;
    const fetchedData = await fetchRequest.fetchData(API_ENDPOINT);
    const cacheKey = `currentWeather_${city}`;

    if (!fetchedData || !fetchedData.response || !fetchedData.response.body) {
      logger.error("공공 날씨 API를 fetch에 실패하였습니다![초단기 실황 데이터]"); // 에러 로깅
      return;
    }
    const currentDataItems = fetchedData.response.body.items.item;

    const existingData = await CurrentDataModel.findOne({
      cityName: city,
      fcstDate: currentDataItems[0].baseDate,
      fcstTime: currentDataItems[0].baseTime,
    });

    if (existingData) {
      logger.error("이미 존재하는 데이터 입니다.");
      return;
    }

    const weatherData = {};
    for (let item of currentDataItems) {
      weatherData[item.category]= item.obsrValue;
    }

    const currentData = new CurrentDataModel({
      cityName: city,
      fcstDate: currentDataItems[0].baseDate,
      fcstTime: currentDataItems[0].baseTime,
      weatherData: weatherData,
    });
    const savedCurrentData = await currentData.save();
    await setCacheData(cacheKey,savedCurrentData,3600)
    logger.info("초단기 실황 데이터를 성공적으로 저장했습니다.");

  } catch (err) {
    logger.error(`fetchCurrentWeather 오류: ${err.message}`); // 에러 로깅
  }
};
