import express from 'express';
import * as enrollmentController from './enrollment.controller.js';
import { protectedAuth } from '../../middlewares/auth.middleware.js';
const router = express.Router();

// Đăng ký / mua khóa học bằng một lần nhấn (1-Click). Quyền: người dùng / quản trị viên.
router.post('/:courseId', protectedAuth, enrollmentController.createEnrollment);

// Lấy danh sách khóa học bản thân đã mua. Quyền: người dùng / quản trị viên.
router.get('/my-courses', protectedAuth, enrollmentController.getMyCourses);

export default router;
