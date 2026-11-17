import bcrypt from 'bcrypt';
import pool from './src/config/db.js';

async function seedDatabase() {
  try {
    console.log('⏳ Đang khởi tạo dữ liệu mẫu cho EduVerse...');

    // Mật khẩu chung cho tất cả tài khoản test: 123456
    const hashedPassword = await bcrypt.hash('123456', 10);

    // 1. Tạo 1 Admin duy nhất (id = 1) và 3 User (id = 2, 3, 4)
    await pool.execute(
      `INSERT IGNORE INTO users (id, email, password, full_name, role) VALUES 
       (1, 'admin@eduverse.vn', ?, 'Quản Trị Viên EduVerse', 'ADMIN'),
       (2, 'user1@eduverse.vn', ?, 'Nguyễn Minh Tuấn', 'USER'),
       (3, 'user2@eduverse.vn', ?, 'Trần Thị Mai Anh', 'USER'),
       (4, 'user3@eduverse.vn', ?, 'Lê Hoàng Nam', 'USER')`,
      [hashedPassword, hashedPassword, hashedPassword, hashedPassword]
    );

    // 2. Tạo 4 danh mục khóa học
    await pool.execute(
      `INSERT IGNORE INTO categories (id, name) VALUES 
       (1, 'Backend'), 
       (2, 'Frontend'), 
       (3, 'Mobile'), 
       (4, 'DevOps')`
    );

    // 3. Tạo 5 khóa học (4 khóa APPROVED hiện lên trang chủ, 1 khóa PENDING để test chức năng Admin duyệt bài)
    await pool.execute(
      `INSERT IGNORE INTO courses (id, title, description, price, thumbnail_url, status, author_id, category_id) VALUES 
       (1, 'Node.js & Express.js REST API Thực Chiến', 'Xây dựng Backend chuẩn kiến trúc Modular với MySQL, Zod và JWT.', 499000, 'https://placehold.co/600x400?text=NodeJS+API', 'APPROVED', 1, 1),
       (2, 'ReactJS Toàn Tập Cho Người Mới Bắt Đầu', 'Làm chủ Hooks, State Management, TailwindCSS và tích hợp REST API.', 399000, 'https://placehold.co/600x400?text=ReactJS', 'APPROVED', 2, 2),
       (3, 'Xây Dựng Ứng Dụng Di Động Với React Native', 'Lập trình ứng dụng đa nền tảng iOS & Android từ con số 0.', 599000, 'https://placehold.co/600x400?text=React+Native', 'APPROVED', 2, 3),
       (4, 'Nhập Môn Lập Trình Web Miễn Phí', 'Nền tảng HTML5, CSS3 và JavaScript ES6+ cơ bản cho người mới.', 0, 'https://placehold.co/600x400?text=Web+Basic', 'APPROVED', 1, 2),
       (5, 'Docker & Triển Khai Hệ Thống Thực Tế', 'Đóng gói ứng dụng Node.js và MySQL với Docker Compose.', 349000, 'https://placehold.co/600x400?text=Docker', 'PENDING', 3, 4)`
    );

    // 4. Tạo Chương học (Sections) cho các khóa học
    await pool.execute(
      `INSERT IGNORE INTO sections (id, course_id, title, order_index) VALUES 
       (1, 1, 'Chương 1: Khởi tạo dự án & Kết nối MySQL', 1),
       (2, 1, 'Chương 2: Xác thực người dùng với JWT & Cookie', 2),
       (3, 2, 'Chương 1: Tư duy Component & JSX trong React', 1),
       (4, 3, 'Chương 1: Cài đặt môi trường React Native & Expo', 1),
       (5, 4, 'Chương 1: Cấu trúc trang web HTML & CSS căn bản', 1)`
    );

    // 5. Tạo Bài giảng (Lessons) cho các chương
    await pool.execute(
      `INSERT IGNORE INTO lessons (id, section_id, title, video_url, order_index) VALUES 
       (1, 1, 'Bài 1: Cài đặt Node.js và tổ chức thư mục Modular', 'https://www.youtube.com/watch?v=Oe421EPjeBE', 1),
       (2, 1, 'Bài 2: Thiết kế Database và kết nối mysql2 Pool', 'https://www.youtube.com/watch?v=Oe421EPjeBE', 2),
       (3, 2, 'Bài 3: Luồng hoạt động Access Token & Refresh Token', 'https://www.youtube.com/watch?v=Oe421EPjeBE', 1),
       (4, 3, 'Bài 1: Hiểu rõ Props và State trong React', 'https://www.youtube.com/watch?v=bMknfKXIFA8', 1),
       (5, 4, 'Bài 1: Tạo giao diện Mobile đầu tiên', 'https://www.youtube.com/watch?v=0-S5a0eXPoc', 1),
       (6, 5, 'Bài 1: Các thẻ HTML thường dùng nhất', 'https://www.youtube.com/watch?v=qz0aGYrrlhU', 1)`
    );

    // 6. Tạo sẵn 2 lượt đăng ký mẫu (user2 đã mua khóa 1, user3 đã nhận khóa miễn phí số 4)
    await pool.execute(
      `INSERT IGNORE INTO enrollments (id, user_id, course_id) VALUES 
       (1, 3, 1),
       (2, 4, 4)`
    );

    console.log('✅ Seed dữ liệu EduVerse thành công!');
    console.log('--------------------------------------------------');
    console.log('🔑 Mật khẩu chung cho tất cả tài khoản: 123456');
    console.log('👑 Admin  : admin@eduverse.vn');
    console.log('👤 User 1 : user1@eduverse.vn (Tác giả khóa 2 & 3)');
    console.log('👤 User 2 : user2@eduverse.vn (Đã mua khóa 1, có khóa 5 đang chờ duyệt)');
    console.log('👤 User 3 : user3@eduverse.vn (Đã đăng ký khóa 4)');
    console.log('--------------------------------------------------');
    process.exit(0);
  } catch (error) {
    console.error('Lỗi khi seed dữ liệu:', error.message);
    process.exit(1);
  }
}

seedDatabase();