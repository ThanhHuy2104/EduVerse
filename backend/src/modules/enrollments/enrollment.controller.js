import * as enrollmentService from "./enrollment.service.js";
// Đăng ký / mua khóa học.
export const createEnrollment = async (req, res, next) => {
  try {
    const courseId = Number(req.params.courseId);
    const enrollmentId = await enrollmentService.createEnrollment(
      req.userId,
      courseId,
    );
    return res.status(201).json({ enrollmentId });
  } catch (error) {
    next(error);
  }
};

// Lấy danh sách khóa học bản thân đã mua.
export const getMyCourses = async (req, res, next) => {
    try {
        const myCourses = await enrollmentService.getMyCourses(req.userId)
        return res.status(200).json({myCourses})
    } catch (error) {
        next(error)
    }
};
