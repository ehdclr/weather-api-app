
```
weatherapi
├─ .eslintrc.json
├─ apis
│  └─ currentData
│     ├─ forcast.service.js
│     └─ forecast.controller.js
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