import * as authRepository from './auth.repository.js';
import {AppError} from '../../utils/appError.util.js';
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import 'dotenv/config';

// Xử lý nghiệp vụ đăng ký tài khoản.
export const signup = async ({ email, password, fullName }) => {
    const existing = await authRepository.findUserByEmail(email);

    if (existing) {
        throw new AppError('Email đã được sử dụng', 400);
    }

    const hashedPassword = await bycrypt.hash(password, 10);
    const userId = await authRepository.createUser({ email, password: hashedPassword, fullName });

    return { userId, email, fullName };
};

// Xử lý nghiệp vụ đăng nhập.
export const signin = async ({email, password}) => {
    const user = await authRepository.findUserByEmail(email);

    if (!user) {
        throw new AppError('Email hoặc mật khẩu không đúng', 400);
    }

    const isMatch = await bycrypt.compare(password, user.password);

    if (!isMatch) {
        throw new AppError('Email hoặc mật khẩu không đúng', 400);
    }

    const accessToken = jwt.sign(
        { userId: user.id }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: '15m' }
    );

    const refreshToken = crypto.randomBytes(64).toString("hex");

    await authRepository.saveSession(user.id, refreshToken);

    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            fullName: user.full_name,
            email: user.email,
            role: user.role,
        },
    }
};

// Xử lý nghiệp vụ cấp lại Access Token.
export const refresh = async () => {};

// Xử lý nghiệp vụ đăng xuất.
export const logout = async ({ refreshToken }) => {
    const deleted = await authRepository.deleteSession(refreshToken);

    if (!deleted) {
        throw new AppError('Phiên đăng nhập không tồn tại hoặc đã hết hạn', 400);
    }
};

// Xử lý nghiệp vụ lấy thông tin người dùng đang đăng nhập.
export const me = async (userId) => {
    const user = await authRepository.findUserById(userId);

    if (!user) {
        throw new AppError('Tài khoản không còn tồn tại', 401);
    }

    // Chỉ trả những thông tin cần thiết, không trả password hash.
    return {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
    };
};
