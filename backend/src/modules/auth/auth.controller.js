import * as authService from './auth.service.js';
// Đăng ký tài khoản mới.
export const signup = async (req, res, next) => {
    try {
        const user = await authService.signup(req.body);
        return res.status(201).json({
            status: 'success',
            message: 'Đăng ký thành công',
            data: user,
        });
    } catch (error) {
        // Chuyển lỗi cho middleware xử lý lỗi.
        return next(error);
    }
};

// Đăng nhập tài khoản.
export const signin = async (req, res, next) => {
    try {
        const { accessToken, refreshToken, user } = await authService.signin(req.body);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, // JS không truy cập được 
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
        });
        return res.status(200).json({
            status: 'success',
            message: 'Đăng nhập thành công',
            data: {
                accessToken,
                user
            },
        });
    } catch (error) {
        return next(error);
    }
};

// Cấp lại Access Token.
export const refresh = async (req, res, next) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                status: 'error',
                message: 'Refresh token không được cung cấp',
            });
        }

        const { accessToken } = await authService.refresh(refreshToken);

        return res.status(200).json({
            status: 'success',
            message: 'Cấp lại Access Token thành công',
            accessToken
        });
    } catch (error) {
        return next(error);
    }
};

// Đăng xuất tài khoản.
export const logout = async (req, res, next) => {
    const refreshToken = req.cookies?.refreshToken;
    try {
        await authService.logout(refreshToken);
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        });
        return res.status(200).json({
            status: 'success',
            message: 'Đăng xuất thành công',
        });
    } catch (error) {
        return next(error);
    }
};

// Lấy thông tin người dùng đang đăng nhập.
export const me = async (req, res, next) => {
    try {
        const user = await authService.me(req.userId);
        return res.status(200).json({
            status: 'success',
            data: user,
        });
    } catch (error) {
        return next(error);
    }
};
