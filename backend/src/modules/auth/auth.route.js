import express from 'express';
import * as authController from './auth.controller.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { signUpSchema, signInSchema } from '../../validators/auth.schema.js';
import { protectedAuth } from '../../middlewares/auth.middleware.js';

const router = express.Router();

// Đăng ký tài khoản mới. Quyền: công khai.
router.post('/signup', validate(signUpSchema), authController.signup);

// Đăng nhập, trả Access Token và Cookie Refresh Token. Quyền: công khai.
router.post('/signin', validate(signInSchema), authController.signin);

// Cấp lại Access Token mới từ Cookie Refresh Token. Quyền: công khai.
router.post('/refresh', authController.refresh);

// Đăng xuất, xóa session trong DB và xóa Cookie. Quyền: người dùng / quản trị viên.
router.post('/logout', authController.logout);

// Lấy thông tin người dùng đang đăng nhập. Quyền: người dùng / quản trị viên.
router.get('/me', protectedAuth, authController.me);

export default router;
