import pool from "../../config/db.js";

export const findProfileById = async (userId) => {
    const [result] = await pool.execute(
        `SELECT id, email, full_name AS fullName, role, phone FROM users WHERE id = ?`,
        [userId]
    )
    return result[0]
};

export const updateProfile = async (userId, {fullName, phone, nickName}) => {
    await pool.execute(
        `UPDATE users
        SET full_name = COALESCE(?, full_name),
            phone = COALESCE(?, phone),
            nick_name = COALESCE(?, nick_name)
        WHERE id = ?`,
        [fullName ?? null, phone ?? null, nickName ?? null, userId]
    )
};
