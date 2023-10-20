/**
 * @swagger
 * tags:
 *   - name: forecast
 *     description: 해당 지역의 초단기, 단기, 초실황에 관련된 라우터
 * 
 * paths:
 *   /fetch-currentdata:
 *     post:
 *       summary: 지역별 초실황 데이터를 공공api에 요청하고 해당 데이터를 데이터베이스에 저장
 *       tags:
 *         - forecast
 *       requestBody:
 *         description: 초실황 일기예보를 얻을 수 있음
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 region:
 *                   type: string
 *                   description: 지역 (example 서울특별시)
 *       responses:
 *         '201':
 *           description: 데이터 추가 완료.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                   statusCode:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       regionName:
 *                         type: string
 *                       currentStatus:
 *                         type: array
 *                         items:
 *                           type: string
 *                       _id:
 *                         type: string
 *                       __v:
 *                         type: integer
 */
