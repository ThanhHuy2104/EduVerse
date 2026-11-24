import pool from '../../config/db.js'

export const getCourseReviews = async (courseId) => {
    const [result] = await pool.execute(
        `SELECT u.full_name AS fullName, r.rating, r.comment 
        FROM reviews AS r
        JOIN users AS u ON r.user_id = u.id 
        WHERE r.course_id = ?`,
        [courseId]
    )
    return result;
};

export const createReview = async (userId, courseId, {rating, comment}) => {
    const [result] = await pool.execute(
        `INSERT INTO reviews (user_id, course_id, rating, comment) VALUES (?, ?, ?, ?)`,
        [userId, courseId, rating, comment ?? null]
    )
    return result.insertId;
};
