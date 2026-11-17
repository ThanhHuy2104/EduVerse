import jwt from 'jsonwebtoken';
import { AppError } from '../utils/appError.util.js';

// Đọc và xác minh access token trong header Authorization: Bearer <token>.
export const authenticate = (req, res, next) => {
    const authorization = req.get('Authorization');
    const match = authorization?.match(/^Bearer\s+(\S+)$/i);

    if (!match) {
        return next(new AppError('Vui lòng đăng nhập', 401));
    }

    try {
        const payload = jwt.verify(match[1], process.env.ACCESS_TOKEN_SECRET, {
            algorithms: ['HS256'],
        });

        if (!Number.isInteger(payload.userId) || payload.userId <= 0) {
            return next(new AppError('Access token không hợp lệ', 401));
        }

        // ID lấy từ token đã xác minh, không lấy từ body hoặc query của client.
        req.userId = payload.userId;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return next(new AppError('Access token đã hết hạn, vui lòng đăng nhập lại', 401));
        }
        if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.NotBeforeError) {
            return next(new AppError('Access token không hợp lệ', 401));
        }
        return next(error);
    }

    return next();
};
