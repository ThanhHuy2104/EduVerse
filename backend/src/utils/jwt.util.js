import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Ký Access Token chứa ID người dùng, có thời hạn 15 phút.
export const signAccessToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );
};

// Xác minh chữ ký và thời hạn Access Token, trả về payload nếu hợp lệ.
// Token sai hoặc hết hạn sẽ ném lỗi để nơi gọi xử lý bằng try/catch.
export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
        algorithms: ['HS256'],
    });
};
