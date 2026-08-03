// app/dashboard/technician/payment/page.tsx
import { CheckCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireTechnician } from "@/lib/auth/requireTechnician";
import { connectStripe } from "./_actions/paymentActions";


type Role = "TECHNICIAN" | "CUSTOMER" | "ADMIN";

interface TechnicianProfile {
  id: string;
  bio: string;
  userId: string;
  profilePhoto: string | null;
  price: string;
  skills: string[];
  experience: string | null;
  stripeAccountId: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
  technicianProfile: TechnicianProfile;
}


const TechnicianPaymentPage = async () => {
  const technician = await requireTechnician();
  const isConnected = Boolean((technician as User).technicianProfile.stripeAccountId);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Payments</h1>

      <Card className="max-w-md">
        {isConnected ? (
          <>
            <CardHeader className="flex flex-col items-start gap-2">
              <CheckCircle className="h-8 w-8 text-green-600" aria-hidden="true" />
              <CardTitle>Stripe Connected</CardTitle>
              <CardDescription>
                Your Stripe account is connected and ready to receive payments.
              </CardDescription>
            </CardHeader>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle>Connect with Stripe</CardTitle>
              <CardDescription>
                Connect your Stripe account to start receiving payments for
                completed bookings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={connectStripe}>
                <Button type="submit" className="w-full">
                  Connect with Stripe
                </Button>
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default TechnicianPaymentPage;