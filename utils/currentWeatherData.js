import logger from "../config/logger.js";
import CurrentDataModel from "../models/current.model.js";
import RegionModel from "../models/region.model.js";
import fetchRequest from "./fetchRequest.js";
import { getCurrentApiDateAndTime } from "./getBaseTime.js";

// 초실황 예보 서비스
export const fetchCurrentWeatherData = async (city, nx, ny) => {
  try {
    const SERVICE_KEY = process.env.WEATHER_API_SERVICE_KEY;
    let { baseTime, baseDate } = getCurrentApiDateAndTime();
    let API_ENDPOINT = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;
    const fetchedData = await fetchRequest.fetchData(API_ENDPOINT);
    const region = await RegionModel.findOne({ regionName: city });

    if (!fetchedData || !fetchedData.response || !fetchedData.response.body) {
      logger.error("공공 날씨 API를 fetch에 실패하였습니다!"); // 에러 로깅
    }
    const currentDataItems = fetchedData.response.body.items.item;

    const existingData = await CurrentDataModel.findOne({
      cityName: city,
      baseDate: currentDataItems[0].baseDate,
      baseTime: currentDataItems[0].baseTime,
    });

    if (existingData) {
      logger.error("이미 존재하는 데이터 입니다.");
      return;
    }

    const weatherData = [];
    const savedCurrentDataItems = [];
    for (let item of currentDataItems) {
      weatherData.push({
        category: item.category,
        obsrValue: item.obsrValue,
      });
    }

    const currentData = new CurrentDataModel({
      cityName: city,
      baseDate: currentDataItems[0].baseDate,
      baseTime: currentDataItems[0].baseTime,
      weatherData: weatherData,
    });
    const savedCurrentData = await currentData.save();
    savedCurrentDataItems.push(savedCurrentData._id);

    if (!region) {
      const newRegion = new RegionModel({
        regionName: city,
        currentDatas: savedCurrentDataItems,
      });
      await newRegion.save();
      logger.info("초단기 실황 데이터를 성공적으로 저장했습니다.");
    } else {
      region.currentDatas.push(...savedCurrentDataItems);
      await region.save();
      logger.info("초단기 실황 데이터를 성공적으로 저장했습니다. (누적)"); // 성공 로깅
    }
  } catch (err) {
    logger.error(`createCurrentWeather 오류: ${err.message}`); // 에러 로깅
  }
};
