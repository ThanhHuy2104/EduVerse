import * as enrollmentRepository from './enrollment.repository.js'
// Đăng ký / mua khóa học.
export const createEnrollment = async (userId, courseId) => {
    return await enrollmentRepository.createEnrollment(userId, courseId)
};

// Lấy danh sách khóa học bản thân đã mua.
export const getMyCourses = async (userId) => {
    return await enrollmentRepository.getMyCourses(userId);
};
