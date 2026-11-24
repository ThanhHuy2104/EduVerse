import * as userRepository from './user.repository.js'
import { AppError } from '../../utils/appError.util.js';
export const me = async (userId) => {
    const user = await userRepository.findProfileById(userId)
    if(!user) {
        throw new AppError('Tài khoản không tồn tại', 401)
    }
    return user;
};

export const updateMe = async (userId, profile) => {
    await userRepository.updateProfile(userId, profile);
    return me(userId);
};
