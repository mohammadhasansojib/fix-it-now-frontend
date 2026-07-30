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

