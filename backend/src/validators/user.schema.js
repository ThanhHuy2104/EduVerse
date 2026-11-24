import { z } from 'zod';

export const updateUserSchema = z.object({
    fullName: z.string().trim().min(1, 'Họ tên không được để trống').max(100).optional(),
    phone: z.string().trim().regex(/^(?:\d{9,10}|\+84[1-9]\d{8})$/, 'Số điện thoại không hợp lệ').optional(),
    nickName: z.string().trim().min(1, 'Biệt danh không được để trống').max(100).optional(),
});
