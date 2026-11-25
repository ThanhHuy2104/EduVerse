import express from 'express';
import authRoutes from '../modules/auth/auth.route.js';
import courseRoutes from '../modules/courses/course.route.js';
import enrollmentRoutes from '../modules/enrollments/enrollment.route.js';
import userRoutes from '../modules/users/user.route.js';
import aiRoutes from '../modules/ai/ai.route.js';
import reviewRoutes from '../modules/reviews/review.route.js';
import cartRoutes from '../modules/cart/cart.route.js';
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/user', userRoutes);
router.use('/ai', aiRoutes);
router.use('/reviews', reviewRoutes);
router.use('/cart', cartRoutes);

export default router;
