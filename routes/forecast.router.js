import express from 'express';
import { forecastController } from '../apis/currentData/forecast.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: forecast
 *   descripiton: 일기예보 api 요청
 */

// 위치의 실시간 데이터 정보
router.get('/forecast/:city/currentdata', forecastController.getCurrentData);

// 위치의 초단기 데이터 정보
router.get('/forecast/:city/utrsrtdata',forecastController.getUtrSrtData);

// 위치의 단기 데이터 정도
router.get('/forecast/:city/srt-termdata',forecastController.getSrtTermData);


export default router;
