import express from 'express';
import { protectedAuth } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { updateUserSchema } from '../../validators/user.schema.js';
import * as userController from './user.controller.js'
const router = express.Router();

router.get('/me', protectedAuth, userController.me);
router.patch('/me', protectedAuth, validate(updateUserSchema), userController.updateMe);

export default router;
