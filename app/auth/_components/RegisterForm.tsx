'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { registerAction } from "../_actions/authActions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const RegisterForm = () => {
    const [state, action, pending] = useActionState(registerAction, false);

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message || "Registration Successful");
        }

        if (!state.success) {
            toast.error(state.message || "Registration Failed");
        }
    }, [state])

    return (
        <form action={action} className="flex flex-col gap-3">
            <Input name="username" type="text" placeholder="enter your username" />
            <Input name="email" type="email" placeholder="enter your email" />
            <Input name="password" type="password" placeholder="enter your password" />
            
            <Select name="role">
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="technician">Technician</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Button className={`cursor-pointer self-center`} type="submit" disabled={pending}>
                {pending ? "Register..." : "Register"}
            </Button>
        </form>
    )
}

export default RegisterForm;