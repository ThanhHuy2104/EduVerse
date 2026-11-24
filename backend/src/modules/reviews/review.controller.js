import * as reviewService from './review.service.js'

export const getCourseReviews = async (req, res, next) => {
    try {
        const reviews = await reviewService.getCourseReviews(req.params.courseId)
        return res.json({status: 'success', data: reviews})
    } catch (error) {
        next(error);
    }
};

export const createReview = async (req, res, next) => {
    const courseId = Number(req.params.courseId);
    if (Number.isNaN(courseId)) {
        return res.status(400).json({ status: 'fail', message: 'ID khóa học không hợp lệ.' });
    }

    try {
        const reviewId = await reviewService.createReview(req.userId, courseId, req.body)
        return res.status(201).json({status: 'success', data: { reviewId }})
    } catch (error) {
        next(error)
    }
};
