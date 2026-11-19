import pool from "../../config/db.js";

// Lấy danh sách khóa học đã duyệt.
export const getCourses = async () => {
  const [courses] = await pool.query(
    'SELECT * FROM courses WHERE status = "APPROVED"',
  );
  return courses;
};

// Lấy chi tiết khóa học cùng chương và bài học.
export const getCourseById = async (id) => {
  const [courses] = await pool.query(
    "SELECT * FROM courses WHERE id = ? AND status = 'APPROVED'", 
    [id]);
  const course = courses[0];
  if (!course) return null;
  
  const [sections] = await pool.query(
    "SELECT * FROM sections WHERE course_id = ? ORDER BY order_index, id", 
    [id]
  );

  const [lessons] = await pool.query(
    `SELECT l.id, l.section_id, l.title, l.order_index
    FROM lessons AS l
    JOIN sections AS s ON s.id = l.section_id
    WHERE s.course_id = ?
    ORDER BY l.order_index, l.id`, 
    [id]
  );

  return {
    ...course, 
    sections: sections.map((section) => ({
      ...section,
      lessons: lessons.filter((lesson) => lesson.section_id === section.id)
  }))}
};

// Tạo khóa học mới với trạng thái PENDING.
export const createCourse = async (courseData) => {
  const [result] = await pool.query("INSERT INTO courses SET ?", [courseData]);
  return result;
};

// Cập nhật thông tin khóa học.
export const updateCourse = async (id, courseData) => {
  const [result] = await pool.query("UPDATE courses SET ? WHERE id = ?", [
    courseData,
    id,
  ]);
  return result;
};

// Duyệt khóa học sang trạng thái APPROVED.
export const approveCourse = async (id) => {
  const [result] = await pool.query(
    'UPDATE courses SET status = "APPROVED" WHERE id = ?',
    [id],
  );
  return result;
};

// Thêm chương mới vào khóa học.
export const createSection = async (courseId, sectionData) => {
  const [result] = await pool.query(
    "INSERT INTO sections (course_id, title) VALUES (?, ?)",
    [courseId, sectionData.title],
  );
  return result;
};

// Thêm bài giảng video vào chương.
export const createLesson = async (sectionId, lessonData) => {
  const [result] = await pool.query(
    "INSERT INTO lessons (section_id, title, video_url) VALUES (?, ?, ?)",
    [sectionId, lessonData.title, lessonData.video_url],
  );
  return result;
};

// Truy vấn video bài giảng và dữ liệu phục vụ kiểm tra quyền xem.
export const getLessonVideo = async (userId, lessonId) => {
  const [result] = await pool.query(
    `SELECT l.video_url, e.user_id AS enrolled_user_id
    FROM lessons AS l
    JOIN sections AS s ON s.id = l.section_id
    LEFT JOIN enrollments AS e
        ON e.course_id = s.course_id AND e.user_id = ?
    WHERE l.id = ?
    `,[userId, lessonId],
  );
  return result[0];
};
