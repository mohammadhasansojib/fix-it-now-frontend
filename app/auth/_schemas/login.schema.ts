import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.email("invalid email address"),
    password: z.string().min(8, "password length is less than 8"),
});