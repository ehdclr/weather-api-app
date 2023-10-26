/**
 * @swagger
 * /api/regions:
 *   get:
 *     tags:
 *       - Region
 *     summary: 초단기 실황 데이터를 수집하고 있는 도시 목록을 조회합니다.
 *     description: 현재 시스템에서 수집하고 있는 도시들의 목록을 반환합니다.
 *     responses:
 *       200:
 *         description: 수집하고 있는 도시 목록을 성공적으로 조회했습니다.
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
 *                   example: 수집할 지역들의 목록입니다
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["제주특별자치도", "서울특별시", "경기도"]
 *  
 *       404:
 *         description: 수집하고 있는 도시가 없을 때의 응답
 *       500:
 *         description: 서버 내부 에러
 */
