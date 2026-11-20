import * as courseService from './course.service.js';

// Lấy danh sách khóa học đã duyệt.
export const getCourses = async (req, res, next) => {
    try {
        const courses = await courseService.getCourses();
        res.json(courses);
    } catch (error) {
        next(error);
    }
};

// Lấy chi tiết khóa học cùng chương và bài học.
export const getCourseById = async (req, res, next) => {
    try {
        const courseId = req.params.courseId;
        const courseData = await courseService.getCourseById(courseId);
        if (!courseData) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(courseData);
    } catch (error) {
        next(error);
    }
};

// Tạo khóa học mới với trạng thái PENDING.
export const createCourse = async (req, res, next) => {
    try {
        const course = await courseService.createCourse({...req.body, author_id: req.userId});
        res.status(201).json(course);
    } catch (error) {
        next(error);
    }
};

// Cập nhật thông tin khóa học.
export const updateCourse = async (req, res, next) => {
    try {
        const courseId = req.params.courseId;
        const courseData = req.body;
        const course = await courseService.updateCourse(courseId, courseData);
        res.json(course);
    } catch (error) {
        next(error);
    }
};

// Duyệt khóa học sang trạng thái APPROVED.
export const approveCourse = async (req, res, next) => {
    try {
        const courseId = req.params.courseId;
        const course = await courseService.approveCourse(courseId);
        res.json(course);
    } catch (error) {
        next(error);
    }
};

// Thêm chương mới vào khóa học.
export const createSection = async (req, res, next) => {
    try {
        const courseId = req.params.courseId;
        const sectionData = req.body;
        const section = await courseService.createSection(courseId, sectionData);
        res.status(201).json(section);
    } catch (error) {
        next(error);
    }
};

// Thêm bài giảng video vào chương.
export const createLesson = async (req, res, next) => {
    try {
        const sectionId = req.params.sectionId;
        const lessonData = req.body;
        const lesson = await courseService.createLesson(sectionId, lessonData);
        res.status(201).json(lesson);
    } catch (error) {
        next(error);
    }
};

// Trả thông tin video bài giảng cho người có quyền xem.
export const getLessonVideo = async (req, res, next) => {
    try {
        const lessonId = req.params.lessonId;
        const userId = req.userId;
        const lessonVideo = await courseService.getLessonVideo(userId, lessonId);
        if (!lessonVideo) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        if (lessonVideo.enrolled_user_id !== userId) {
            return res.status(403).json({ message: 'Bạn chưa đăng ký khóa học này' });
        }
        res.json({ video_url: lessonVideo.video_url });
    } catch (error) {
        next(error);
    }
};
