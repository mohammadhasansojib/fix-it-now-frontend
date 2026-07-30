import Link from "next/link";
import LoginForm from "../_components/LoginForm";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const LoginPage = async () => {


  return (
    <div>
      <div className="flex justify-center items-center h-screen">

        <Card className="text-center border max-w-120 min-w-80 p-5 mx-5">
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to login</CardDescription>

          {/* Form Component */}
          <LoginForm />

          <CardDescription>
            <span>Do not have any account?</span>
            <Link href="/auth/register" className="underline">register</Link>
          </CardDescription>
        </Card>

      </div>
    </div>
  )
}

export default LoginPage;