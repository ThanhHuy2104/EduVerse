import express from 'express';
import authRoutes from '../modules/auth/auth.route.js';
import courseRoutes from '../modules/courses/course.route.js';
import enrollmentRoutes from '../modules/enrollments/enrollment.route.js';
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);
router.use('/enrollments', enrollmentRoutes);

export default router;