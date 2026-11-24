import * as authRepository from "./auth.repository.js";
import { AppError } from "../../utils/appError.util.js";
import bycrypt from "bcrypt";
import { signAccessToken } from "../../utils/jwt.util.js";
import crypto from "crypto";
import "dotenv/config";

// Xử lý nghiệp vụ đăng ký tài khoản.
export const signup = async ({ email, password, fullName }) => {
  const existing = await authRepository.findUserByEmail(email);

  if (existing) {
    throw new AppError("Email đã được sử dụng", 409);
  }

  const hashedPassword = await bycrypt.hash(password, 10);
  try {
    const userId = await authRepository.createUser({
      email,
      password: hashedPassword,
      fullName,
    });

    return { userId, email, fullName };
  } catch (error) {
    // Hai request có thể cùng vượt qua bước kiểm tra email; DB sẽ chặn bản ghi trùng.
    if (error.code === 'ER_DUP_ENTRY') {
      throw new AppError("Email đã được sử dụng", 409);
    }
    throw error;
  }
};

// Xử lý nghiệp vụ đăng nhập.
export const signin = async ({ email, password }) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw new AppError("Email hoặc mật khẩu không đúng", 400);
  }

  const isMatch = await bycrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Email hoặc mật khẩu không đúng", 400);
  }

  const accessToken = signAccessToken(user.id);

  const refreshToken = process.env.REFRESH_TOKEN_SECRET;

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
  };
};

// Xử lý nghiệp vụ cấp lại Access Token.
export const refresh = async (refreshToken) => {
  const session = await authRepository.findSessionByToken(refreshToken);

  if (!session) {
    throw new AppError("Refresh token không hợp lệ hoặc đã hết hạn", 400);
  }

  const accessToken = signAccessToken(session.user_id);

  return { accessToken };
};

// Xử lý nghiệp vụ đăng xuất.
export const logout = async (refreshToken) => {
  // Không có cookie thì xem như đã đăng xuất, tránh truyền undefined xuống MySQL.
  if (typeof refreshToken !== 'string' || !refreshToken) {
    return;
  }

  // Session đã bị xóa vẫn xem là thành công để có thể đăng xuất nhiều lần.
  // Lỗi kết nối hoặc truy vấn DB vẫn được chuyển lên controller.
  await authRepository.deleteSession(refreshToken);
};
