/**
 * @swagger
 * /api/forecasts/srt-term:
 *   get:
 *     tags:
 *       - Forecast
 *     summary: 특정 도시의 단기 날씨 예보 데이터를 조회합니다.
 *     description: 선택한 도시에 대한 단기 날씨 예보 정보를 가져옵니다.
 *     parameters:
 *       - name: city
 *         in: query
 *         description: 조회할 도시의 이름
 *         required: true
 *         type: string
 *         example: 경상남도
 *     responses:
 *       200:
 *         description: 단기 날씨 예보 데이터를 성공적으로 조회했습니다.
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
 *                   example: 경상남도지역의 단기 예보 데이터 입니다.
 *                 data:
 *                   type: object
 *                   properties:
 *                     cityName:
 *                       type: string
 *                       example: 경상남도
 *                     forecast:
 *                       type: object
 *                       properties:
 *                          fcstDate:
 *                              type: object
 *                              properties:
 *                                  fcstTime:
 *                                      $ref: '#/components/schemas/shortTerm-WeatherData'
 *                         
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: |
 *              해당 요청을 찾을 수 없을 때 응답
 *              - 요청한 도시 데이터가 없을 때
 *              - 공공 API에서 데이터를 가져오는 데 실패했을 때
 * 
 * 
 * components:
 *   schemas:
 *     shortTerm-WeatherData:
 *       type: object
 *       properties:
 *         TMP:
 *           type: string
 *           example: "17"
 *         UUU:
 *           type: string
 *           example: "0.7"
 *         VVV:
 *           type: string
 *           example: "1.3"
 *         VEC:
 *           type: string
 *           example: "208"
 *         WSD:
 *           type: string
 *           example: "1.5"
 *         SKY:
 *           type: string
 *           example: "1"
 *         PTY:
 *           type: string
 *           example: "0"
 *         POP:
 *           type: string
 *           example: "0"
 *         WAV:
 *           type: string
 *           example: "0"
 *         PCP:
 *           type: string
 *           example: "강수없음"
 *         REH:
 *           type: string
 *           example: "65"
 *         SNO:
 *           type: string
 *           example: "적설없음"
 *         TMN:
 *           type: string
 *           example: "12.5"
 *         TMX:
 *           type: string
 *           example: "27.5"
 */