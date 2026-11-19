import { verifyAccessToken } from '../utils/jwt.util.js';
import * as courseRepository from '../modules/auth/auth.repository.js'
import { AppError } from '../utils/appError.util.js';
import db from '../config/db.js';

export const protectedAuth = async (req, res, next) => {
    try {
        // Lấy token từ header
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1];

        if(!token) {
            return res.status(401).json({message: "Không tìm thấy access token!!!"})
        }
        // Xác minh token hợp lệ bằng utility
        let decodedUser;
        try {
            decodedUser = verifyAccessToken(token);
        } catch (err) {
            console.error(err)
            return res.status(401).json({message: "Access token hết hạn hoặc không đúng"})
        }

        // Tìm user
        const [user] = await db.execute(
            `SELECT id, role, full_name AS fullName, email FROM users WHERE id = ?`,
            [decodedUser.userId]
        )

        if(user.length === 0) {
            return res.status(404).json({message: "Người dùng không tồn tại!!!"})
        }
        // Trả user về trong req
        console.log('Thành công')
        req.user = user[0]
        req.userId = user[0].id
        next()

    } catch (error) {
        console.error('Lỗi xác minh jwt!!!', error)
        return res.status(500).json({message: "Lỗi hệ thống"})
    }
}

export const adminRole = (req, res, next) => {
    try {
        // Kiểm tra xem user có phải admin không
        if (req.user.role === 'ADMIN') {
            console.log('Đây là admin');
            return next();
        }
        return res.status(403).json({message: "Bạn không có quyền truy cập"});
    } catch (error) {
        console.error('Lỗi xác minh roleId!!!', error)
        return res.status(500).json({message: "Lỗi hệ thống"})
    }
}

export const courseOwnerOrAdmin = async (req, res, next) => {
    try {
        const course = await courseRepository.getCourseOwner(req.params.id);

        if (!course) {
            return next(new AppError('Không tìm thấy khóa học', 404));
        }

        const isOwner = course.author_id === req.userId;
        const isAdmin = req.user.role === 'ADMIN';

        if (isOwner || isAdmin) {
            return next();
        }

        return next(new AppError('Bạn không có quyền sửa khóa học này', 403));
    } catch (error) {
        return next(error);
    }
};