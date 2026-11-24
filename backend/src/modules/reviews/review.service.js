import * as reviewRepository from './review.repository.js'
import { AppError } from '../../utils/appError.util.js';

export const getCourseReviews = async (courseId) => {
    return await reviewRepository.getCourseReviews(courseId)
};

export const createReview = async (userId, courseId, reviewData) => {
    try {
        return await reviewRepository.createReview(userId, courseId, reviewData);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new AppError('Bạn đã đánh giá khóa học này rồi.', 409);
        }
        throw error;
    }
};
