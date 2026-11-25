import express from 'express';
import { protectedAuth } from '../../middlewares/auth.middleware.js';
import * as cartController from './cart.controller.js';

const router = express.Router();

router.get('/', protectedAuth, cartController.getCartItems);
router.post('/checkout', protectedAuth, cartController.checkoutCart);
router.post('/:courseId', protectedAuth, cartController.addCartItem);
router.delete('/:courseId', protectedAuth, cartController.removeCartItem);

export default router;
