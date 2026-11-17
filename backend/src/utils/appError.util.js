// Tạo lớp lỗi riêng kế thừa Error của JavaScript; export để file khác có thể import.
export class AppError extends Error {
  // Nhận thông báo và mã HTTP; nếu bỏ qua mã HTTP thì dùng 400.
  constructor(message, statusCode = 400) {
    // Gọi constructor của Error để lưu thông báo vào this.message.
    super(message);

    // Lưu mã HTTP để middleware biết cần trả mã nào cho client.
    this.statusCode = statusCode;
    // Lỗi 4xx được đánh dấu fail, lỗi 5xx được đánh dấu error.
    this.status = statusCode < 500 ? 'fail' : 'error';
    // Đánh dấu lỗi đã được chủ động tạo ra; middleware hiện tại chưa dùng thuộc tính này.
    this.isOperational = true;
  }
}
