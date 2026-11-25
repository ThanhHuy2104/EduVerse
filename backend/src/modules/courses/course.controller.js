import * as courseService from './course.service.js';

// Lấy danh sách khóa học đã duyệt.
export const getCourses = async (req, res, next) => {
    try {
        const courses = await courseService.getCourses();
        res.json({ status: 'success', data: courses });
    } catch (error) {
        next(error);
    }
};

// Lấy chi tiết khóa học cùng chương và bài học.
export const getCourseById = async (req, res, next) => {
    try {
        const courseId = Number(req.params.courseId);
        if (!Number.isSafeInteger(courseId) || courseId < 1) {
            return res
                .status(400)
                .json({ status: 'fail', message: 'ID khóa học không hợp lệ.' });
        }
        const courseData = await courseService.getCourseById(courseId);
        res.json({ status: 'success', data: courseData });
    } catch (error) {
        next(error);
    }
};

// Tạo khóa học mới với trạng thái PENDING.
export const createCourse = async (req, res, next) => {
    try {
        const course = await courseService.createCourse({...req.body, author_id: req.userId});
        res.status(201).json({ status: 'success', data: course });
    } catch (error) {
        next(error);
    }
};

// Cập nhật thông tin khóa học.
export const updateCourse = async (req, res, next) => {
    try {
        const courseId = Number(req.params.courseId);
        if (!Number.isSafeInteger(courseId) || courseId < 1) {
            return res
                .status(400)
                .json({ status: 'fail', message: 'ID khóa học không hợp lệ.' });
        }
        const courseData = req.body;
        const course = await courseService.updateCourse(courseId, courseData);
        res.json({ status: 'success', data: course });
    } catch (error) {
        next(error);
    }
};

// Duyệt khóa học sang trạng thái APPROVED.
export const approveCourse = async (req, res, next) => {
    try {
        const courseId = Number(req.params.courseId);
        if (!Number.isSafeInteger(courseId) || courseId < 1) {
            return res
                .status(400)
                .json({ status: 'fail', message: 'ID khóa học không hợp lệ.' });
        }
        const course = await courseService.approveCourse(courseId);
        res.json({ status: 'success', data: course });
    } catch (error) {
        next(error);
    }
};

// Thêm chương mới vào khóa học.
export const createSection = async (req, res, next) => {
    try {
        const courseId = Number(req.params.courseId);
        if (!Number.isSafeInteger(courseId) || courseId < 1) {
            return res
                .status(400)
                .json({ status: 'fail', message: 'ID khóa học không hợp lệ.' });
        }
        const sectionData = req.body;
        const section = await courseService.createSection(courseId, sectionData);
        res.status(201).json({ status: 'success', data: section });
    } catch (error) {
        next(error);
    }
};

// Thêm bài giảng video vào chương.
export const createLesson = async (req, res, next) => {
    try {
        const sectionId = Number(req.params.sectionId);
        if (!Number.isSafeInteger(sectionId) || sectionId < 1) {
            return res
                .status(400)
                .json({ status: 'fail', message: 'ID chương không hợp lệ.' });
        }
        const lessonData = req.body;
        const lesson = await courseService.createLesson(sectionId, lessonData);
        res.status(201).json({ status: 'success', data: lesson });
    } catch (error) {
        next(error);
    }
};

// Trả thông tin video bài giảng cho người có quyền xem.
export const getLessonVideo = async (req, res, next) => {
    try {
        const lessonId = Number(req.params.lessonId);
        if (!Number.isSafeInteger(lessonId) || lessonId < 1) {
            return res
                .status(400)
                .json({ status: 'fail', message: 'ID bài giảng không hợp lệ.' });
        }
        const userId = req.userId;
        const lessonVideo = await courseService.getLessonVideo(userId, lessonId);
        res.json({ status: 'success', data: { video_url: lessonVideo.video_url } });
    } catch (error) {
        next(error);
    }
};
