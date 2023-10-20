//초실황 데이터 cron 작업 //서울 경기 제주
import cron from "node-cron";
import { fetchCurrentWeatherData } from "../utils/currentWeatherData.js";
import { dfs_xy_conv } from "../utils/locationConverter.js";

export const startCronJobs = () => {
  //초단기 실황 데이터 cron 작업 
  cron.schedule(
    "0 */10 * * * *",
    async () => {
      //node-cron으로 서울 경기 제주 fetch요청 하기

      //TODO 여기에 이제 googleMaps로 경도 위도 구하는 로직 구현

      //locationConverter로 nx ny 받기
      //     서울강남구
      // 서울
      // 강남구
      // 127.0495556
      // 37.514575

      //     경기고양시

      // 경기

      // 고양시

      // 126.7770556

      // 37.65590833

      // 제주도 위도 33.431441 경도 126.874237

      //서울
      const {x:x1,y:y1} = dfs_xy_conv("toXY", "37.514575", "127.0495556");
      //경기도
      const {x:x2,y:y2} = dfs_xy_conv("toXY", "37.65590833", "126.7770556");
      //제주도
      const {x:x3,y:y3} =dfs_xy_conv("toXY", "33.431441", "126.874237");
      //TODO 추가하려면 아래에 도시 추가하고, 위도 경도 추가하기 (정적인 값 )
      //TODO 동적으로 추가하려면 해당 지역의 위도 경도 구하는 로직 함수만들기

      await fetchCurrentWeatherData("서울특별시", x1, y1);
      await fetchCurrentWeatherData("경기도", x2, y2);
      await fetchCurrentWeatherData("제주도",x3,y3);
    },
    {
      timezone: "Asia/Seoul",
    }
  );

  // cron.schedule("",async() => {
  //   //여기에 1. 초단기 예보 로직
  // })

  // cron.schedule("",async()=>{
  //   //여기에 2. 단기 예보 로직
  // })
};
