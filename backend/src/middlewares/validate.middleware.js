import { AppError } from '../utils/appError.util.js';

// Nhận schema và trả về middleware kiểm tra request body.
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    // Gộp các thông báo và chuyển đến middleware xử lý lỗi hiện có.
    const message = result.error.issues.map((issue) => issue.message).join('; ');
    return next(new AppError(message, 400));
  }

  // Dùng dữ liệu đã được Zod xử lý (trim, loại bỏ trường ngoài schema).
  req.body = result.data;
  return next();
};
