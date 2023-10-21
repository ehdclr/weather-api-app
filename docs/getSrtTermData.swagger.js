/**
 * @swagger
 * /forecast/{city}/srt-termdata:
 *   get:
 *     tags:
 *       - Forecast
 *     summary: 특정 도시의 단기 날씨 예보 데이터를 조회합니다.
 *     description: 선택한 도시에 대한 단기 날씨 예보 정보를 가져옵니다.
 *     parameters:
 *       - name: city
 *         in: path
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       cityName:
 *                         type: string
 *                         example: 경상남도
 *                       fcstDate:
 *                         type: string
 *                         example: 20231022
 *                       fcstTime:
 *                         type: string
 *                         example: 0300
 *                       weatherData:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             category:
 *                               type: string
 *                               example: TMP
 *                             fcstValue:
 *                               type: string
 *                               example: 7
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 데이터를 찾을 수 없음
 */
