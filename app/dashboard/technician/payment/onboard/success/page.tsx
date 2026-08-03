// app/dashboard/technician/payment/onboard/success/page.tsx
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const OnboardSuccessPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm text-center">
        <CardHeader className="flex flex-col items-center gap-2">
          <CheckCircle className="h-12 w-12 text-green-600" aria-hidden="true" />
          <CardTitle className="text-xl">Stripe Onboarding Complete</CardTitle>
          <CardDescription>
            Your Stripe account has been connected successfully.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/dashboard/technician">Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardSuccessPage;