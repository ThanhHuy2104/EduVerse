import express from 'express';
import recommendationRoutes from './recommendations/recommend.route.js';

const router = express.Router();

router.use('/recommendations', recommendationRoutes);

export default router;
