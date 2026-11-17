import pool from '../../config/db.js';

// Lấy danh sách khóa học đã duyệt.
export const getCourses = async (req, res, next) => {
    const [result] = await pool.query('SELECT * FROM courses WHERE status = "APPROVED"');
    console.log(result);
    res.json(result);
};

// Lấy chi tiết khóa học cùng chương và bài học.
export const getCourseById = async (req, res) => {};

// Tạo khóa học mới với trạng thái PENDING.
export const createCourse = async (req, res) => {};

// Cập nhật thông tin khóa học.
export const updateCourse = async (req, res) => {};

// Duyệt khóa học sang trạng thái APPROVED.
export const approveCourse = async (req, res) => {};

// Thêm chương mới vào khóa học.
export const createSection = async (req, res) => {};

// Thêm bài giảng video vào chương.
export const createLesson = async (req, res) => {};
