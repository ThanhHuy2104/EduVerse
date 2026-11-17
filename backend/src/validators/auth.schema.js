import { z } from "zod";


export const signUpSchema = z.object({
    email: z.string().trim().pipe(z.email("Email không hợp lệ")),
    password: z.string().min(1, "Bắt buộc nhập mật khẩu"),
    fullName: z.string().trim().min(1, "Bắt buộc nhập họ tên"),
})

export const signInSchema = z.object({
    email: z.string().trim().pipe(z.email("Email không hợp lệ")),
    password: z.string().min(1, "Bắt buộc nhập mật khẩu"),
})
