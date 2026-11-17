import express from 'express';
import * as courseController from './course.controller.js';

const router = express.Router();

// Lấy danh sách khóa học đã duyệt, hỗ trợ tìm kiếm và lọc danh mục. Quyền: công khai.
router.get('/', courseController.getCourses);

// Xem chi tiết khóa học cùng danh sách chương và bài học. Quyền: công khai.
router.get('/:id', courseController.getCourseById);

// Tạo khóa học mới với trạng thái mặc định PENDING. Quyền: người dùng / quản trị viên.
router.post('/', courseController.createCourse);

// Cập nhật thông tin khóa học. Quyền: chủ khóa học / quản trị viên.
router.patch('/:id', courseController.updateCourse);

// Duyệt khóa học lên sàn, chuyển trạng thái thành APPROVED. Quyền: quản trị viên.
router.patch('/:id/approve', courseController.approveCourse);

// Thêm chương mới vào khóa học. Quyền: chủ khóa học / quản trị viên.
router.post('/:courseId/sections', courseController.createSection);

// Thêm bài giảng video vào chương. Quyền: chủ khóa học / quản trị viên.
router.post('/sections/:sectionId/lessons', courseController.createLesson);

export default router;

