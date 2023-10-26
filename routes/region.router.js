import express from 'express';
import { regionController } from '../apis/region/region.controller.js';
import authJwt from '../middleware/auth.middleware.js';



const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: region
 *   descripiton: 수집 지역 추가
 */

//수집할 지역의 추가 (실시간 실황 데이터 수집)
router.post('/regions',authJwt,regionController.addRegion);

//실시간 데이터 조회하는 (실시간 실황 데이터 수집)
router.get('/regions',regionController.getRegions)

//수집할 지역 삭제하는 라우터 
router.delete('/regions',authJwt,regionController.deleteRegion);


export default router;