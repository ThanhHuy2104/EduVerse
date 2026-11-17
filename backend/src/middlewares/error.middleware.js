// Middleware xử lý lỗi phải có đủ 4 tham số để Express nhận diện.
// err: lỗi nhận được; req: request; res: response; next: chuyển tiếp xử lý.
export const errorMiddleware = (err, req, res, next) => {
  // Kiểm tra response đã gửi header cho client hay chưa.
  if (res.headersSent) {
    // Nếu đã gửi thì chuyển lỗi cho bộ xử lý tiếp theo và dừng hàm, tránh gửi response lần nữa.
    return next(err);
  }

  // Ưu tiên statusCode; nếu không có thì thử status do thư viện khác cung cấp.
  const code = err.statusCode || err.status;
  // Chỉ chấp nhận mã lỗi HTTP là số nguyên từ 400 đến 599.
  const statusCode = Number.isInteger(code) && code >= 400 && code <= 599
    // Nếu mã hợp lệ thì dùng mã đó.
    ? code
    // Nếu mã không hợp lệ hoặc không tồn tại thì dùng 500 (lỗi server).
    : 500;

  // Kiểm tra đây có phải lỗi phía server hay không.
  if (statusCode >= 500) {
    // Ghi chi tiết lỗi vào console của backend để hỗ trợ tìm nguyên nhân.
    console.error(err);
  }

  // Đặt mã HTTP, gửi JSON về client rồi kết thúc hàm.
  return res.status(statusCode).json({
    // Trả nhãn fail cho lỗi 4xx hoặc error cho lỗi 5xx.
    status: statusCode < 500 ? 'fail' : 'error',
    // Lỗi 4xx trả thông báo gốc; lỗi 5xx trả thông báo chung để tránh lộ chi tiết nội bộ.
    message: statusCode < 500 ? err.message : 'Lỗi máy chủ, vui lòng thử lại sau.',
  });
};
