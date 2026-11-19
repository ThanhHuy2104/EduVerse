import pool from '../../config/db.js';
// Tìm người dùng theo email.
export const findUserByEmail = async (email) => {
    const [emailResult] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return emailResult[0];
};

// Tìm người dùng theo ID.
export const findUserById = async (id) => {
    const [user] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return user[0];
};

// Tạo người dùng mới.
export const createUser = async ({ email, password, fullName }) => {
    const [result] = await pool.execute(
        'INSERT INTO users (email, password, full_name) VALUES (?, ?, ?)',
        [email, password, fullName]
    );
    return result.insertId;
};

// Lưu phiên đăng nhập và Refresh Token.
export const saveSession = async (userId, refreshToken) => {
    const [result] = await pool.execute(
        'INSERT INTO sessions (user_id, refresh_token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))',
        [userId, refreshToken]
    );
    return result.insertId;
};

// Tìm phiên đăng nhập còn hạn theo Refresh Token.
export const findSessionByToken = async (refreshToken) => {
    const [session] = await pool.execute(
        'SELECT * FROM sessions WHERE refresh_token = ? AND expires_at > NOW()',
        [refreshToken]
    );
    return session[0];
};

// Xóa phiên đăng nhập theo Refresh Token.
export const deleteSession = async (refreshToken) => {
    const [result] = await pool.execute(
        'DELETE FROM sessions WHERE refresh_token = ?',
        [refreshToken]
    );
    return result.affectedRows > 0;
};

export const getCourseOwner = async (courseId) => {
    const [rows] = await pool.query(
        'SELECT author_id FROM courses WHERE id = ?',
        [courseId],
    );

    return rows[0];
};
