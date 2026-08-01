'use server'

import { config } from "@/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginSchema } from "../_schemas/login.schema";
import { RegisterSchema } from "../_schemas/register.schema";

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
    const accessToken = result.data.accessToken;

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