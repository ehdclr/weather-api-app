# 폴더 구조 

```
weatherapi
├─ .eslintrc.json
├─ apis
│  └─ forecast
│     ├─ forcast.service.js
│     ├─ forecast.controller.js
│     └─ schema
│        ├─ currentData.schema.js
│        ├─ shortTermData.schema.js
│        └─ utrSrtData.schema.js
├─ app.js
├─ config
│  ├─ config.js
│  ├─ database.js
│  ├─ logger.js
│  ├─ redis.js
│  └─ swagger.js
├─ docs
│  ├─ getCurrentData.swagger.js
│  ├─ getSrtTermData.swagger.js
│  └─ getUtrSrtData.swagger.js
├─ middleware
│  ├─ errorHandler.middleware.js
│  └─ requestValidation.middleware.js
├─ models
│  ├─ current.model.js
│  └─ region.model.js
├─ package-lock.json
├─ package.json
├─ routes
│  └─ forecast.router.js
├─ server.js
└─ utils
   ├─ cache
   │  └─ redisCache.js
   ├─ cron
   │  └─ cronManager.js
   ├─ data
   │  └─ location.xlsx
   ├─ fetchData
   │  ├─ currentWeatherData.js
   │  └─ fetchRequest.js
   ├─ getBaseTime.js
   ├─ httpErrors.js
   ├─ location
   │  ├─ locationConverter.js
   │  └─ locationUtils.js
   ├─ response.js
   └─ responseValidation.js

```
# 실행 방법

- npm run start:dev
- npm run start:dev-pm2 -> pm2로 실행하기



## 예보 코드값 정보

<img width="454" alt="image" src="https://github.com/ehdclr/weather-api-app/assets/80464000/39169f42-1942-4820-9f4d-0714f45abfde">


## API 요청
![image](https://github.com/ehdclr/weather-api-app/assets/80464000/306592ef-37e3-4198-a3b6-f9851934cc20)

- swagger url : /api-docs


## 스키마 
![image](https://github.com/ehdclr/weather-api-app/assets/80464000/43033747-8555-41c1-b236-9b655fa2bdfb)
![image](https://github.com/ehdclr/weather-api-app/assets/80464000/22327f14-0ef6-4388-a185-5531710c1ce1)
- schema 구조 (currentdatas)
  - 초단기 실황 데이터를 스키마에 저장
  - cityName : 도시 이름
  - fcstDate : 예보 날짜
  - fcstTime : 예보 시간
  - weatherData:
       - 날씨 데이터 

<details>
  <summary><h3>예보 데이터 API</h3></summary>
  <div markdown="1">
    <ul>
       <img src="https://github.com/ehdclr/weather-api-app/assets/80464000/da559061-8af1-4967-af97-5f18a282a728" width=70%>
       <img src="https://github.com/ehdclr/weather-api-app/assets/80464000/1b3f0f56-84bc-4b72-9d90-6cae7c59490c" width=70%>
      <li>초단기 실황 데이터 - 1시간 기준으로 공공 api 요청 (node-cron)사용  </li>
       <p>서울시, 경기도, 제주도 초단기 실황 데이터를 1시간 기준으로 누적 (매 시간 40분마다 api 요청 제공) cron으로 주기적으로 데이터 요청</p>
      <img src="https://github.com/ehdclr/weather-api-app/assets/80464000/b9a1bf0c-5c66-419d-b8f1-583c06acaa04" width=70%>
      <li>초단기 데이터 - 1시간 기준으로 공공 api 요청</li>
      <p>단기 예보 데이터 1시간 기준으로 업데이트 (매 시간 45분마다 api 요청 제공)</p>
      <img src="https://github.com/ehdclr/weather-api-app/assets/80464000/391127e0-d57d-400e-84a0-4be5c6c7714f" width=70%>
      <li>단기 예보 데이터 - 3시간 기준으로 공공 api 요청</li>
      <p>단기 예보 데이터 3시간 기준으로 업데이트</p>
    </ul>
  </div>
</details> 

## 특이 사항
- redis ttl 값을 각 api 제공시간에 맞춰 공공 api 데이터를 만료 (공공 api 요청시)

- baseTime과 baseDate를 api 제공 시간에 맞춰 시간을 수정
  - getCurrentAPiDateAndTime 함수 (현재시간을 초단기 실황 api 제공 시간으로 수정하는 함수)
  - getUtrShortApiDateAndTime 함수 (현재시간을 초단기 api 제공 시간으로 수정하는 함수)
  - getShortTermApiDateAndTime 함수 (현재시간을 단기 api 제공 시간으로 수정하는 함수)
  - 추가 변동사항 ) new Date가 운영체제의 시간에 맞추기 때문에 한국 시간에 맞추도록 수정

- xlsx 파일을 통해 해당 지역의 데이터를 입력시 위도(lat) 경도(lng) 데이터를 가져옴
  - locationUtils.js 파일
    - 해당 도시의 위 경도를 가져옴
    - 지역 이름을 xlsx의 지역 이름에 맞춰 가져오는 함수 (getCityFullName 함수)
    - xlsx을 기준으로 도시명을 하기 때문에 (완전한 유사 검색으로는 되지 않음)

- 해당 위,경도를 공공 api의 좌표로 변환하는 함수

- 해당 응답 데이터에 대한 schema 검증
  - AJV를 사용하여 적절한 응답 객체인지 validation 검증



## 성능 개선 
- redis cache를 통한 응답 데이터 시간 감소 (upstash 사용)
   - 초단기 실황 API
    - 공공 API 요청시 : 약 1.4초
    - redis cache 요청시 : 약 0.4초 ~0.6초 (약 60% 속도 향상)
    - database 요청시 : 약 0.6초 ~ 0.8초

   - 초단기 예보 데이터 API
     - 공공 API 요청시 : 약 1.4초
     - redis cache 요청시 : 약 0.4초 ~ 0.6초 (약 60% 속도 개선)
    
   - 단기 예보 데이터 API
     - 공공 API 요청시 : 약 2초 ~ 4초
     - redis cache 요청시 : 0.5초 ~0.7초 (약 70~ 80% 속도 개선)


<details>
  <summary><h2>시퀀스 다이어그램</h2></summary>
  <div markdown="1">
    <ul>
       <img src="https://github.com/ehdclr/weather-api-app/assets/80464000/45b514c8-66b5-4ecc-a8df-a2b140b09cb4" width=70%>
      <li>초단기 실황 데이터 시퀀스 다이어그램  </li>
      <img src="https://github.com/ehdclr/weather-api-app/assets/80464000/b3533531-d1aa-4181-bcc9-3fb11bd803c6" width=70%>
      <li>초단기 데이터 시퀀스 다이어그램</li>
      <img src="https://github.com/ehdclr/weather-api-app/assets/80464000/b65fa520-2107-4c6b-b9b0-0a41ed1ac917" width=70%>
      <li>단기 예보 데이터 시퀀스 다이어그램</li>
    </ul>
  </div>
</details> 


### 개선 해야할 점 및 추가 사항
- xlsx 파일을 기준으로 도시명을 가져오기 때문에, 유사 검색으로는 되지 않음
- 초단기 실황 ,초단기 데이터, 단기 데이터만을 가져오는 api만 구성
- 추가적인 로직 필요시 업데이트
