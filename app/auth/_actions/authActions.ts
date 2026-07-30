'use server'

import { config } from "@/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as z from "zod"

type LoginState = {
  success: boolean,
  message: string,
  statusCode: number,
  data: {
    accessToken: string
  }
}

type RegisterState = {
  success: boolean,
  message: string,
  statusCode: number,
  data: {
    user: {
      id: string,
      username: string,
      email: string,
      role: 'CUSTOMER' | 'TECHNICIAN',
      isBanned: boolean,
      createdAt: Date,
      updatedAt: Date,
    }
  }
}

export const loginAction = async (prevState: LoginState, formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    const payload = {
        email,
        password,
    }

    const LoginSchema = z.object({
        email: z.email("invalid email address"),
        password: z.string().min(8, "password length is less than 8"),
    });
    const validationResult = LoginSchema.safeParse(payload);
    console.log("validation result: ", validationResult);

    if (!validationResult.success) {
        const errorMessage = validationResult.error.issues.map(issue => issue.message).join(" and ");

        return {
            success: validationResult.success,
            message: errorMessage,
        }
    }

    const res = await fetch(`${config.server.backend_api_url}/api/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(validationResult.data),
    });

    const result = await res.json();
    console.log("response: ", result);

    if (!result.success) {
        return result;
    }

    // get jwt tokens
    const accessToken = await result.data.accessToken;

    // set cookies
    const cookieStore = await cookies();
    cookieStore.set("access_token", accessToken as string, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
    });
    
    redirect("/")
    
    // return result;
}

export const registerAction = async (prevState: RegisterState, formData: FormData) => {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");

    const payload = {
        username,
        email,
        password,
        role,
    }
    console.log("payload: ", payload);

    const RegisterSchema = z.object({
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

    const validationResult = RegisterSchema.safeParse(payload);

    if (!validationResult.success) {
        const errorMessage = validationResult.error.issues.map(issue => issue.message).join(" and ");

        return {
            success: validationResult.success,
            message: errorMessage,
        }
    }

    const res = await fetch(`${config.server.backend_api_url}/api/auth/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(validationResult.data),
    });

    const result = await res.json();
    console.log("response: ", result);

    if (!result.success) {
        return result;
    }

    redirect("/auth/login")
}