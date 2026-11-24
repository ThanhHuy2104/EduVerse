import * as userService from './user.service.js'

export const me = async (req, res, next) => {
    try {
        const user = await userService.me(req.userId);
        return res.json({status: 'success', data: user})
    } catch (error) {
        next(error)        
    }
};

export const updateMe = async (req, res, next) => {
    try {
        const user = await userService.updateMe(req.userId, req.body)
        return res.json({status: 'success', message: 'Thay đổi thông tin user thành công', data: user})
    } catch (error) {
        return next(error)
    }
};
