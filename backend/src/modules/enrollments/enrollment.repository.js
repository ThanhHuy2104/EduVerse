import pool from "../../config/db.js";

// Đăng ký / mua khóa học.
export const createEnrollment = async (userId, courseId) => {
  const [result] = await pool.execute(
    `INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)`,
    [userId, courseId],
  );

  return result.insertId;
};

// Lấy danh sách khóa học bản thân đã mua.
export const getMyCourses = async (userId) => {
  const [result] = await pool.execute(
    `SELECT c.title, c.thumbnail_url, u.full_name
    FROM courses AS c
    JOIN users AS u ON u.id = c.author_id
    JOIN enrollments AS e ON c.id = e.course_id
    WHERE e.user_id = ? `, [userId],
  );

  return result
};
