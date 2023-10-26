/**
 * @swagger
 * /api/regions:
 *   post:
 *     summary: 수집할 지역의 추가 (실시간 실황 데이터 수집)
 *     security:
 *      - bearerAuth: []
 *     description: 새로운 지역을 수집할 지역 목록에 추가합니다.
 *     tags:
 *       - Region
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *                 description: 추가하려는 도시의 이름.
 *             example:
 *               city: 제주
 *     responses:
 *       201:
 *         description: 지역이 성공적으로 추가되었을 때의 응답.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 statusCode:
 *                   type: number
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: 제주의 지역을 추가 수집합니다.
 *                 data:
 *                   type: object
 *                   properties:
 *                     region:
 *                       type: string
 *                       example: 제주특별자치도
 *       401:
 *         description: 관리자 로그인하지 않았을 때 응답.
 *       404:
 *         description: |
 *           해당 요청을 찾을 수 없을 때 응답
 *             - 해당 도시를 찾을 수 없을 때의 응답.
 *             - 찾을 도시를 입력하지 않았을 때의 응답.
 *       409:
 *         description: 이미 등록된 도시일 경우의 응답.
 *       500:
 *         description: 서버 내부 에러 발생 시의 응답.
 */