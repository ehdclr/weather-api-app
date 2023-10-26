# 폴더 구조 

```
weatherapi
├─ .eslintrc.json
├─ README.md
├─ apis
│  ├─ admin
│  │  ├─ admin.controller.js
│  │  ├─ admin.service.js
│  │  └─ schema
│  │     └─ login.schema.js
│  ├─ forecast
│  │  ├─ forcast.service.js
│  │  ├─ forecast.controller.js
│  │  └─ schema
│  │     ├─ currentData.schema.js
│  │     ├─ shortTermData.schema.js
│  │     └─ utrSrtData.schema.js
│  └─ region
│     ├─ region.controller.js
│     ├─ region.service.js
│     └─ schema
│        └─ regions.schema.js
├─ app.js
├─ config
│  ├─ config.js
│  ├─ database.js
│  ├─ logger.js
│  ├─ redis.js
│  └─ swagger.js
├─ docs
│  ├─ admin
│  │  └─ login.swagger.js
│  ├─ forecasts
│  │  ├─ getCurrentData.swagger.js
│  │  ├─ getSrtTermData.swagger.js
│  │  └─ getUtrSrtData.swagger.js
│  └─ regions
│     ├─ deleteRegion.swagger.js
│     ├─ getRegions.swagger.js
│     └─ postRegion.swagger.js
├─ middleware
│  ├─ auth.middleware.js
│  └─ errorHandler.middleware.js
├─ models
│  ├─ admin.model.js
│  ├─ current.model.js
│  └─ region.model.js
├─ package-lock.json
├─ package.json
├─ routes
│  ├─ admin.router.js
│  ├─ forecast.router.js
│  └─ region.router.js
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


# 사용 기술
- server : express
- DB : MongoDB, Redis

## 예보 코드값 정보

![image](https://github.com/ehdclr/weather-api-app/assets/80464000/dfa670b2-b94b-404e-a012-b9ec7db988e1)



## API 응답 코드
![image](https://github.com/ehdclr/weather-api-app/assets/80464000/398767ed-7e19-49f7-89ec-599016a41eaa)

- swagger url : [swagger-api-docs](http://52.141.48.49:8000/api-docs/)


## 스키마 
![image](https://github.com/ehdclr/weather-api-app/assets/80464000/8d7a4bbb-fa33-4813-921c-a67451f03c79)
- schema 구조 (currentdatas)
  - 초단기 실황 데이터를 스키마에 저장
  - cityName : 도시 이름
  - fcstDate : 예보 날짜
  - fcstTime : 예보 시간
  - weatherData:
       - 날씨 데이터
       - 날씨 코드 : 날씨 값

<br>
<br>

![image](https://github.com/ehdclr/weather-api-app/assets/80464000/b59e608f-828d-40d1-9abe-4dfde9c6cf35)
- schema 구조
  - 초단기 실황 데이터를 수집할 지역
  - regionName: 수집할 지역


## API
<details>
  <summary><h3>예보 데이터 API</h3></summary>
  <div markdown="1">
    <ul>
       <img src="https://github.com/ehdclr/weather-api-app/assets/80464000/221f1abe-6b40-4ea3-91b8-b9972ea6f66c" width=70%>
       <img src="https://github.com/ehdclr/weather-api-app/assets/80464000/c22fd71f-f039-4440-998f-1978a1c703b2" width=70%>
      <li>초단기 실황 데이터(/api/forecasts/current[GET]) - 1시간 기준으로 공공 api 요청 (node-cron)사용  </li>
       <p>서울시, 경기도, 제주도 초단기 실황 데이터를 1시간 기준으로 누적 (매 시간 40분마다 api 요청 제공) cron으로 주기적으로 데이터 요청</p>
      <img src="https://github.com/ehdclr/weather-api-app/assets/80464000/5a651058-c7c3-4ce2-9850-89e44001cf42" width=70%>
      <li>초단기 데이터(/api/forecasts/utrsrt[GET]) - 1시간 기준으로 공공 api 요청</li>
      <p>단기 예보 데이터 1시간 기준으로 업데이트 (매 시간 45분마다 api 요청 제공)
      <img src="https://github.com/ehdclr/weather-api-app/assets/80464000/0a71ad49-5902-4a3a-bc7e-cc1f85bda455" width=70%>
      <li>단기 예보 데이터(/api/forecasts/utrsrt[GET]) - 3시간 기준으로 공공 api 요청</li>
      <p>단기 예보 데이터 3시간 기준으로 업데이트</p>
    </ul>
  </div>
</details> 

### 지역 API
- /api/regions (POST) : 초단기 실황 데이터 로그를 저장할 지역 추가 (관리자 권한 필요)
- /api/regions (GET) : 로그 수집중인 지역 리스트 목록 보여주기
- /api/regions (DELETE) : 로그 수집중인 지역을 삭제하기 (관리자 권한 필요)

### 로그인 API
- /api/admin/login (POST) : 관리자 아이디 로그인

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
  - 응답 일관성을 위해 AJV를 사용하여 적절한 응답 객체인지 validation 검증

- 응답 객체 구조
  - 도시, 날짜, 시간별로 객체로 묶어 날씨 코드와 해당하는 날씨 값을 응답하도록 구성

- 데이터베이스 ttl
  - mongodb 스키마의 ttl을 2일을 주어, 초단기 실황 데이터를 현재 기준에서 2일전까지만 저장하도록함

- cron으로 초단기 실황 데이터를 수집하기 때문에 많은 요청을 방지하기 위해 수집 지역 추가 및 삭제 부분은 관리자로 접속하여 지역 추가 및 삭제 가능 

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
     - redis cache 요청시 : 0.5초 ~ 0.7초 (약 70~ 80% 속도 개선)

## 시퀀스 다이어그램
<details>
  <summary><h2>시퀀스 다이어그램</h2></summary>
  <div markdown="1">
    <ul>
       <img src="https://github.com/ehdclr/weather-api-app/assets/80464000/4fc58dde-c255-4bfc-a9b4-687dd0f911df" width=70%>
      <li>초단기 실황 데이터 시퀀스 다이어그램  </li>
      <img src="https://github.com/ehdclr/weather-api-app/assets/80464000/c275b4f7-ce17-4598-b741-f079e05bc08f" width=70%>
      <li>초단기 데이터 시퀀스 다이어그램</li>
      <img src="https://github.com/ehdclr/weather-api-app/assets/80464000/fbf968c2-b956-4721-bca8-a22d771381c0" width=70%>
      <li>단기 예보 데이터 시퀀스 다이어그램</li>
      <img src="https://github.com/ehdclr/weather-api-app/assets/80464000/aeedfa81-7e82-4a03-bb78-9344c0367d5f" width=70%>
      <li>도시의 초단기 실황 데이터 누적하기위한 지역추가 시퀀스 다이어그램</li>
       <img src="https://github.com/ehdclr/weather-api-app/assets/80464000/b30cbbcd-8fd8-43a7-bc6c-8ece5449f2bf" width=70%>
      <li>수집하고 있는 도시들 목록 보여주기</li>
       <img src="https://github.com/ehdclr/weather-api-app/assets/80464000/c5fc5591-d07c-4568-8b4d-2e3b1b1876ef" width=70%>
       <li>수집 중인 도시를 삭제하기 위한 시퀀스 다이어그램</li>
    </ul>
  </div>
</details> 


### 개선 해야할 점 및 추가 사항
- xlsx 파일을 기준으로 도시명을 가져오기 때문에, 유사 검색으로는 되지 않음
- 초단기 실황 ,초단기 데이터, 단기 데이터만을 가져오는 api만 구성
- 추가적인 로직 필요시 업데이트


