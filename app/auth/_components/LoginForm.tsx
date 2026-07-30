'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAction } from "../_actions/authActions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";


const LoginForm = () => {
    const [state, action, pending] = useActionState(loginAction, false);

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message || "Login Successful");
        }

        if (!state.success) {
            toast.error(state.message || "Login Failed");
        }
    }, [state])

    return (
        <form action={action} className="flex flex-col gap-3">
            <Input name="email" type="email" placeholder="enter your email" />
            <Input name="password" type="password" placeholder="enter your password" />

            <Button disabled={pending} className={`cursor-pointer self-center`} type="submit">
                {
                    pending ? "Login..." : "Login"
                }
            </Button>
        </form>
    )
}

export default LoginForm;