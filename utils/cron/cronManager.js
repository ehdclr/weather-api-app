//초실황 데이터 cron 작업 //서울 경기 제주
import cron from "node-cron";
import logger from "../../config/logger.js";
import RegionModel from "../../models/region.model.js";
import { fetchCurrentWeatherData } from "../fetchData/currentWeatherData.js";
import { dfs_xy_conv } from "../location/locationConverter.js";
import { getLatitudeAndLongitude } from "../location/locationUtils.js";

export const startCronJobs = async () => {
  //초단기 실황 데이터 cron 작업  (10분마다 데이터 업데이트 - 공공 api 공식 문서)
  cron.schedule(
    "0 */10 * * * *",
    async () => {
      const regions = await RegionModel.find();

      const promises = regions.map(async (region) => {
        const city = region.regionName;
        const { lat, lng } = getLatitudeAndLongitude(city);
        const { x, y } = dfs_xy_conv("toXY", lat, lng);
        return fetchCurrentWeatherData(city, x, y);
      });

      try {
        await Promise.all(promises);
      } catch (err) {
        logger.error(`날씨 데이터를 불러오는 동안 에러가 발생했습니다!${err}`);
      }

    },
    {
      timezone: "Asia/Seoul",
    }
  );
};
