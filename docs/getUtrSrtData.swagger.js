/**
 * @swagger
 * /api/forecasts/utrsrt:
 *   get:
 *     tags:
 *       - Forecast
 *     summary: 위치의 초단기 데이터 정보를 반환합니다.
 *     description: 특정 도시에 대한 현재의 초단기 날씨 정보를 가져옵니다.
 *     parameters:
 *       - name: city
 *         in: query
 *         description: 조회할 도시의 이름
 *         required: true
 *         type: string
 *         example: 서울특별시
 *     responses:
 *       200:
 *         description: 날씨 데이터를 성공적으로 가져옴
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: 서울특별시지역의 현재 초단기 데이터 입니다.
 *                 data:
 *                   type: object
 *                   properties:
 *                     cityName:
 *                       type: string
 *                       example: 서울특별시
 *                     forecast:
 *                       type: object
 *                       properties: 
 *                         fcstDate:
 *                           type: object
 *                           properties:
 *                             fcstTime:
 *                               $ref: '#/components/schemas/ForecastTime'
 *                             
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 데이터를 찾을 수 없음
 *
 * components:
 *   schemas:
 *     ForecastTime:
 *       type: object
 *       properties:
 *         LGT:
 *           type: string
 *         PTY:
 *           type: string
 *         RN1:
 *           type: string
 *         SKY:
 *           type: string
 *         T1H:
 *           type: string
 *         REH:
 *           type: string
 *         UUU:
 *           type: string
 *         VVV:
 *           type: string
 *         VEC:
 *           type: string
 *         WSD:
 *           type: string
 */
