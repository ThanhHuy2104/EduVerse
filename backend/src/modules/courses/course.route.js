import express from 'express';
import * as courseController from './course.controller.js';
import { protectedAuth } from '../../middlewares/auth.middleware.js';
import { adminRole } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { courseOwnerOrAdmin } from '../../middlewares/auth.middleware.js';
import {
    createCourseSchema,
    updateCourseSchema,
    createSectionSchema,
    createLessonSchema,
} from '../../validators/course.schema.js';

const router = express.Router();

// Lấy danh sách khóa học đã duyệt, hỗ trợ tìm kiếm và lọc danh mục. Quyền: công khai.
router.get('/', courseController.getCourses);

// Xem chi tiết khóa học cùng danh sách chương và bài học. Quyền: công khai.
router.get('/:courseId', courseController.getCourseById);

// Tạo khóa học mới với trạng thái mặc định PENDING. Quyền: người dùng / quản trị viên.
router.post('/', protectedAuth, validate(createCourseSchema), courseController.createCourse);

// Cập nhật thông tin khóa học. Quyền: chủ khóa học / quản trị viên.
router.patch('/:courseId', protectedAuth, courseOwnerOrAdmin, validate(updateCourseSchema), courseController.updateCourse);

// Duyệt khóa học lên sàn, chuyển trạng thái thành APPROVED. Quyền: quản trị viên.
router.patch('/:courseId/approve', protectedAuth, adminRole, courseController.approveCourse);

// Thêm chương mới vào khóa học. Quyền: chủ khóa học / quản trị viên.
router.post('/:courseId/sections', protectedAuth, courseOwnerOrAdmin, validate(createSectionSchema), courseController.createSection);

// Thêm bài giảng video vào chương. Quyền: chủ khóa học / quản trị viên.
router.post('/sections/:sectionId/lessons', protectedAuth, courseOwnerOrAdmin, validate(createLessonSchema), courseController.createLesson);

// Lấy video bài giảng cho người dùng đã đăng ký khóa học.
router.get('/lessons/:lessonId/video', protectedAuth, courseController.getLessonVideo);

export default router;

