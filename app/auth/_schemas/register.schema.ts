import * as z from 'zod'


export const RegisterSchema = z.object({
    username: z.string()
    .min(3, `username must be atleast 3 characters`)
    .max(30, `username cannot exceed 30 characters`)
    .trim(),

    email: z.email("Invalid email address")
    .min(1, "email is required")
    .trim(),

    password: z.string()
    .min(8, "password must be atleast 8 characters")
    .max(50, "password cannot exceed 50 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
    "Password must contain uppercase, lowercase, and number"),

    role: z.enum(['customer', 'technician'], "role must be 'customer' or 'technician'"),
});