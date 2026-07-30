import Link from "next/link";
import RegisterForm from "../_components/RegisterForm";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const RegisterPage = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">

        <Card className="text-center border max-w-120 min-w-80 p-5 mx-5">
          <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
          <CardDescription>Enter your credentials to register</CardDescription>

          {/* Form Component */}
          <RegisterForm />

          <CardDescription>
            <span>Already have an account?</span>
            <Link href="/auth/login" className="underline">login</Link>
          </CardDescription>
        </Card>

      </div>
    </div>
  )
}

export default RegisterPage;