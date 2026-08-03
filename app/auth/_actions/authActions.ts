'use server'

import { config } from "@/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginSchema } from "../_schemas/login.schema";
import { RegisterSchema } from "../_schemas/register.schema";
import jwt, { JwtPayload } from 'jsonwebtoken'

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

    
    const validationResult = LoginSchema.safeParse(payload);

    if (!validationResult.success) {
        const errorMessage = validationResult.error.issues.map(issue => issue.message).join(" and ");

        return {
            success: validationResult.success,
            message: errorMessage,
        }
    }

    let result;

    try {
        const res = await fetch(`${config.server.backend_api_url}/api/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validationResult.data),
        });

        result = await res.json();
    } catch {
        return {
            success: false,
            message: "Something went wrong. Please try again.",
        };
    }

    if (!result.success) {
        return result;
    }

    // get jwt tokens
    const accessToken = result.data.accessToken;

    const decoded = jwt.decode(accessToken) as JwtPayload;
    const role = decoded.role;
    const redirectPath = role === "ADMIN"
                        ? "/dashboard/admin"
                        : role === "TECHNICIAN"
                        ? "/dashboard/technician"
                        : "/dashboard/customer";

    // set cookies
    const cookieStore = await cookies();
    cookieStore.set("access_token", accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });
    
    redirect(redirectPath);
    
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

    const validationResult = RegisterSchema.safeParse(payload);

    if (!validationResult.success) {
        const errorMessage = validationResult.error.issues.map(issue => issue.message).join(" and ");

        return {
            success: validationResult.success,
            message: errorMessage,
        }
    }

    let result;

    try {
        const res = await fetch(`${config.server.backend_api_url}/api/auth/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validationResult.data),
        });

        result = await res.json();
    } catch {
        return {
            success: false,
            message: "Something went wrong. Please try again.",
        };
    }

    if (!result.success) {
        return result;
    }

    redirect("/auth/login")
}

export const logoutAction = async () => {
    const cookieStore = await cookies();

    cookieStore.delete("access_token");

    redirect("/auth/login")
}