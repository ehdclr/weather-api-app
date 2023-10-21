//초실황 데이터 cron 작업 //서울 경기 제주
import cron from "node-cron";
import { fetchCurrentWeatherData } from "../fetchData/currentWeatherData.js";
import { dfs_xy_conv } from "../location/locationConverter.js";
import {getLatitudeAndLongitude} from "../location/locationUtils.js";

export const startCronJobs = () => {
  //초단기 실황 데이터 cron 작업  (10분마다 데이터 업데이트 된다했으니 수정)
  cron.schedule(
    "0 */10 * * * *",
    async () => {
      //node-cron으로 서울 경기 제주 fetch요청 하기
      //서울 -위도
      const { lat: lat1, lng: lng1 } = getLatitudeAndLongitude("서울특별시");
      const { x: x1, y: y1 } = dfs_xy_conv("toXY", lat1, lng1);
      //경기도
      const { lat: lat2, lng: lng2 } = getLatitudeAndLongitude("경기도");
      const { x: x2, y: y2 } = dfs_xy_conv("toXY", lat2, lng2);
      //제주도
      const { lat: lat3, lng: lng3 } =
        getLatitudeAndLongitude("제주특별자치도");
      const { x: x3, y: y3 } = dfs_xy_conv("toXY", lat3, lng3);

      //TODO 추가하려면 아래에 도시 추가하고, 위도 경도 추가하기 (정적인 값 )
      //TODO 동적으로 추가하려면 해당 지역의 위도 경도 구하는 로직 함수만들기

      await fetchCurrentWeatherData("서울특별시", x1, y1);
      await fetchCurrentWeatherData("경기도", x2, y2);
      await fetchCurrentWeatherData("제주도", x3, y3);
    },
    {
      timezone: "Asia/Seoul",
    }
  );
};
