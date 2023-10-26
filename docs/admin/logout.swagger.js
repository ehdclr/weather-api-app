/**
 * @swagger
 * /api/admin/logout:
 *   post:
 *     security:
 *      - cookieAuth: [] 
 *     summary: 관리자 로그아웃
 *     tags: [Admin]
 *     responses:
 *       '200':
 *         description: 관리자 로그아웃 성공
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               statusCode: 200
 *               message: 관리자님의 로그아웃에 성공하였습니다
 *       '401':
 *         description: 세션이 없거나 로그인되어 있지 않은 경우
 *       '500':
 *         description: 서버 오류
 */