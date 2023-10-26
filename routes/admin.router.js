import express from 'express';
import { adminController } from '../apis/admin/admin.controller.js';
import authJwt from '../middleware/auth.middleware.js';




const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   descripiton: 관리자 api
 */

router.post('/admin/login',adminController.login);


export default router;