import express from 'express';
import { currentDataController } from '../apis/currentData/forecast.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: forecast
 *   descripiton: 해당 지역의 초단기, 단기 초실황에 관련된 라우터 
 */

// 현재 위치의 실시간 데이터 정보
router.get('/currentdata', currentDataController.getCurrentData);

export default router;
