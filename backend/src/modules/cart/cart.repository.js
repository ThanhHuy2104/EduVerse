import pool from '../../config/db.js'

export const getCartItems = async (userId) => {
    const [result] = await pool.execute(
        `SELECT c.id AS courseId, c.title, c.thumbnail_url, c.price, c.author_id, 
        AVG(r.rating) AS averageRating
        FROM courses AS c
        INNER JOIN cart_items AS ci ON c.id = ci.course_id
        LEFT JOIN reviews AS r ON r.course_id = c.id
        WHERE ci.user_id = ?
        GROUP BY c.id, c.title, c.thumbnail_url, c.price, c.author_id
        `, [userId]
    )

    return result
};

export const addCartItem = async (userId, courseId) => {
    const [result] = await pool.execute(
        `INSERT INTO cart_items (user_id, course_id) VALUES (?, ?)`,
        [userId, courseId]
    )

    return result.insertId
};

export const removeCartItem = async (userId, courseId) => {
    const [result] = await pool.execute(
        `DELETE FROM cart_items
        WHERE user_id = ? AND course_id = ?`,
        [userId, courseId]
    )
    return result.affectedRows;
};

export const checkoutCart = async (userId, courseIds) => {
    const courses = courseIds.map((courseId) => [userId, courseId]);
    const [result] = await pool.query(
        'INSERT INTO enrollments (user_id, course_id) VALUES ?',
        [courses],
    );
    return result.affectedRows;
};
