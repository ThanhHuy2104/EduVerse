import * as courseRepository from './course.repository.js';
// Lấy danh sách khóa học đã duyệt.
export const getCourses = async () => {
    return await courseRepository.getCourses();
};

// Lấy chi tiết khóa học cùng chương và bài học.
export const getCourseById = async (id) => {
    return await courseRepository.getCourseById(id);
};

// Tạo khóa học mới với trạng thái PENDING.
export const createCourse = async (courseData) => {
    return await courseRepository.createCourse(courseData);
};

// Cập nhật thông tin khóa học.
export const updateCourse = async (id, courseData) => {
    return await courseRepository.updateCourse(id, courseData);
};

// Duyệt khóa học sang trạng thái APPROVED.
export const approveCourse = async (id) => {
    return await courseRepository.approveCourse(id);
};

// Thêm chương mới vào khóa học.
export const createSection = async (courseId, sectionData) => {
    return await courseRepository.createSection(courseId, sectionData);
};

// Thêm bài giảng video vào chương.
export const createLesson = async (sectionId, lessonData) => {
    return await courseRepository.createLesson(sectionId, lessonData);
};

// Kiểm tra quyền mua khóa học trước khi lấy video bài giảng.
export const getLessonVideo = async (userId, lessonId) => {
    return await courseRepository.getLessonVideo(userId, lessonId);
};
