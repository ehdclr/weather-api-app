import express from 'express';
import { forecastController } from '../apis/forecast/forecast.controller.js';


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: forecast
 *   descripiton: 일기예보 api 요청
 */

// 위치의 실시간 데이터 정보
router.get('/forecasts/current', forecastController.getCurrentData);

// 위치의 초단기 데이터 정보
router.get('/forecasts/utrsrt',forecastController.getUtrSrtData);

// 위치의 단기 데이터 정도
router.get('/forecasts/srt-term',forecastController.getSrtTermData);



export default router;
