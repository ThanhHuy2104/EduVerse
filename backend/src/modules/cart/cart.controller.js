import * as cartService from "./cart.service.js";

export const getCartItems = async (req, res, next) => {
  try {
    const carts = await cartService.getCartItems(req.userId);
    return res.json({ status: "success", data: carts });
  } catch (error) {
    next(error);
  }
};

export const addCartItem = async (req, res, next) => {
  const courseId = Number(req.params.courseId);
  if (!Number.isSafeInteger(courseId) || courseId < 1) {
    return res
      .status(400)
      .json({ status: "fail", message: "ID khóa học không hợp lệ." });
  }
  try {
    const cartItemId = await cartService.addCartItem(req.userId, courseId);
    return res.status(201).json({ status: "success", data: { cartItemId } });
  } catch (error) {
    next(error);
  }
};

export const removeCartItem = async (req, res, next) => {
  const courseId = Number(req.params.courseId);
  if (!Number.isSafeInteger(courseId) || courseId < 1) {
    return res
      .status(400)
      .json({ status: "fail", message: "ID khóa học không hợp lệ." });
  }
  try {
    await cartService.removeCartItem(req.userId, courseId);
    return res.json({ status: "success" });
  } catch (error) {
    next(error);
  }
};

export const checkoutCart = async (req, res, next) => {
    const courseIds = req.body?.courseIds;
    if (!Array.isArray(courseIds) || !courseIds.length ||
        courseIds.some((id) => !Number.isSafeInteger(id) || id < 1)) {
        return res.status(400).json({
            status: 'fail',
            message: 'courseIds phải là mảng số nguyên dương và có ít nhất một khóa học.',
        });
    }

    try {
        await cartService.checkoutCart(req.userId, courseIds)
        return res.json({status: 'success'})
    } catch (error) {
        next(error)
    }
};
