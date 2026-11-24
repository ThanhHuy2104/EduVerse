import express from 'express';
import { protectedAuth } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createReviewSchema } from '../../validators/review.schema.js'
import * as reviewController from './review.controller.js'
const router = express.Router();


router.get('/:courseId', reviewController.getCourseReviews);

router.post('/:courseId', protectedAuth, validate(createReviewSchema), reviewController.createReview);

export default router;
