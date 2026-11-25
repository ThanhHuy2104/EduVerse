import * as courseRepository from './course.repository.js';
import { AppError } from '../../utils/appError.util.js';
// Lấy danh sách khóa học đã duyệt.
export const getCourses = async () => {
    return await courseRepository.getCourses();
};

// Lấy chi tiết khóa học cùng chương và bài học.
export const getCourseById = async (courseId) => {
    const course = await courseRepository.getCourseById(courseId);
    if (!course) {
        throw new AppError('Không tìm thấy khóa học.', 404);
    }
    return course;
};

// Tạo khóa học mới với trạng thái PENDING.
export const createCourse = async (courseData) => {
    try {
        return await courseRepository.createCourse(courseData);
    } catch (error) {
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            throw new AppError('Danh mục hoặc tác giả không tồn tại.', 400);
        }
        throw error;
    }
};

// Cập nhật thông tin khóa học.
export const updateCourse = async (courseId, courseData) => {
    let result;
    try {
        result = await courseRepository.updateCourse(courseId, courseData);
    } catch (error) {
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            throw new AppError('Danh mục hoặc tác giả không tồn tại.', 400);
        }
        throw error;
    }
    if (result.affectedRows === 0) {
        throw new AppError('Không tìm thấy khóa học.', 404);
    }
    return result;
};

// Duyệt khóa học sang trạng thái APPROVED.
export const approveCourse = async (courseId) => {
    const result = await courseRepository.approveCourse(courseId);
    if (result.affectedRows === 0) {
        throw new AppError('Không tìm thấy khóa học.', 404);
    }
    return result;
};

// Thêm chương mới vào khóa học.
export const createSection = async (courseId, sectionData) => {
    try {
        return await courseRepository.createSection(courseId, sectionData);
    } catch (error) {
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            throw new AppError('Không tìm thấy khóa học.', 404);
        }
        throw error;
    }
};

// Thêm bài giảng video vào chương.
export const createLesson = async (sectionId, lessonData) => {
    try {
        return await courseRepository.createLesson(sectionId, lessonData);
    } catch (error) {
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            throw new AppError('Chương không tồn tại.', 404);
        }
        throw error;
    }
};

// Kiểm tra quyền mua khóa học trước khi lấy video bài giảng.
export const getLessonVideo = async (userId, lessonId) => {
    const lessonVideo = await courseRepository.getLessonVideo(userId, lessonId);
    if (!lessonVideo) {
        throw new AppError('Không tìm thấy bài giảng.', 404);
    }
    if (lessonVideo.enrolled_user_id !== userId) {
        throw new AppError('Bạn chưa đăng ký khóa học này.', 403);
    }
    return lessonVideo;
};
