/**
 * @swagger
 * /api/regions:
 *   delete:
 *     summary: 수집 지역 삭제
 *     tags:
 *       - Region
 *     description: 지정된 도시의 수집 지역 정보를 삭제합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              city:
 *                type: string
 *                description: 삭제하려는 도시의 이름.
 *            example: 
 *              city: 경상남도
 *     responses:
 *       200:
 *         description: 도시의 수집 지역 정보가 성공적으로 삭제됨.
 *       401:
 *         description: 인증되지 않은 요청.
 *       404:
 *         description: |
 *          - 요청한 도시가 발견되지 않음.
 *          - 도시의 fullName을 찾을 수 없을 때(xlsx파일 참조)
 */