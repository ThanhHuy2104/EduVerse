import { z } from "zod";


export const createCourseSchema = z.object({
    // Bỏ khoảng trắng ở hai đầu. Tên khóa học phải có từ 1 đến 255 ký tự sau khi trim.
    title: z.string().trim().min(1, "Bắt buộc nhập tên khóa học").max(255),
    // Có thể bỏ qua hoặc gửi null. Nếu gửi chuỗi thì bỏ khoảng trắng ở hai đầu.
    description: z.string().trim().nullish(),
    // Có thể bỏ qua. Nếu gửi thì phải là số từ 0 đến giới hạn trên của DECIMAL(10, 2).
    price: z.number().min(0, "Giá khóa học không được âm").max(99999999.99).optional(),
    // Có thể bỏ qua hoặc gửi null. Nếu gửi chuỗi thì tối đa 255 ký tự sau khi trim.
    thumbnail_url: z.string().trim().max(255).nullish(),
    // ID danh mục phải là số nguyên dương. ID tác giả lấy từ tài khoản đăng nhập.
    category_id: z.number().int().positive(),
})

// partial() cho phép gửi từng trường và vẫn kiểm tra các trường đã gửi theo schema tạo.
// refine() kiểm tra sau khi Zod bỏ các trường lạ, nên body phải còn ít nhất một trường.
export const updateCourseSchema = createCourseSchema.partial().refine(
    (data) => Object.keys(data).length > 0,
    "Bắt buộc nhập ít nhất một trường cần cập nhật",
)

export const createSectionSchema = z.object({
    // Tên chương phải có từ 1 đến 200 ký tự sau khi trim.
    title: z.string().trim().min(1, "Bắt buộc nhập tên chương").max(200),
})

export const createLessonSchema = z.object({
    // Tên bài học phải có từ 1 đến 200 ký tự sau khi trim.
    title: z.string().trim().min(1, "Bắt buộc nhập tên bài học").max(200),
    // Đường dẫn video phải có từ 1 đến 255 ký tự sau khi trim. Kiểm tra độ dài ở đây.
    video_url: z.string().trim().min(1, "Bắt buộc nhập đường dẫn video").max(255),
})
