import express from 'express';
import { protectedAuth } from '../../../middlewares/auth.middleware.js';
import { getRecommendations } from './recommend.controller.js';

const router = express.Router();

router.post('/', getRecommendations);

export default router;
