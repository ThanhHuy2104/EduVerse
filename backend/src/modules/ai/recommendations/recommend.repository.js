// Thêm truy vấn dữ liệu phục vụ gợi ý khóa học tại đây khi triển khai tính năng.
import pool from "../../../config/db.js";

export async function findCourses({ keyword, maxPrice }) {
  const conditions = ["status = ?"];
  const params = ["APPROVED"];

  if (keyword) {
    conditions.push("title LIKE ?");
    params.push(`%${keyword}%`);
  }

  if (maxPrice !== null) {
    conditions.push("price < ?");
    params.push(maxPrice);
  }

  const [courses] = await pool.execute(
    `SELECT id, title, price
     FROM courses
     WHERE ${conditions.join(" AND ")}
     ORDER BY price ASC, id ASC`,
    params,
  );

  return courses;
}