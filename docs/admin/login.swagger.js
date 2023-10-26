/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: 관리자 로그인
 *     tags: [Admin]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: 관리자 아이디
 *               password:
 *                 type: string
 *                 description: 관리자 비밀번호
 *     responses:
 *       '200':
 *         description: 관리자 로그인 성공
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               statusCode: 200
 *               message: 관리자님의 로그인에 성공하였습니다
 *               data:
 *                 username: test
 *       '401':
 *         description: |
 *            권한이 없을 때 응답
 *              - 아이디나 비밀번호를 입력하지 않았을 때 응답
 *              - 관리자 아이디나 비밀번호가 틀렸을 때 응답
 *       '500':
 *         description: 서버 오류
 */