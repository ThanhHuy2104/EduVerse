import * as cartRepository from './cart.repository.js'
import { AppError } from '../../utils/appError.util.js'

export const getCartItems = async (userId) => {
    return await cartRepository.getCartItems(userId);    
};

export const addCartItem = async (userId, courseId) => {
    try {
        return await cartRepository.addCartItem(userId, courseId);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new AppError('Khóa học đã có trong giỏ hàng.', 409);
        }
        throw error;
    }
};

export const removeCartItem = async (userId, courseId) => {
    const affectedRows = await cartRepository.removeCartItem(userId, courseId);
    if (affectedRows === 0) {
        throw new AppError('Khóa học không có trong giỏ hàng.', 404);
    }
    return affectedRows;
};

export const checkoutCart = async (userId, courseIds) => {
    try {
        return await cartRepository.checkoutCart(userId, [...new Set(courseIds)]);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new AppError('Bạn đã đăng ký ít nhất một khóa học được chọn.', 409);
        }
        throw error;
    }

};
