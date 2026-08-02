// app/dashboard/customer/bookings/[id]/pay/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireCustomer } from "@/lib/auth/requireCustomer";

interface Booking {
  id: string;
  startTime: string;
  status: string;
  amount: string;
}

interface PayPageProps {
  params: Promise<{ id: string }>;
}

const getBooking = async (id: string, accessToken: string): Promise<Booking | null> => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings/${id}`, {
    cache: "no-store",
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  });

  if (!res.ok) {
    return null;
  }

  const json = await res.json();
  return json.data.booking;
};

const PayPage = async ({ params }: PayPageProps) => {
  const user = await requireCustomer();

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const { id } = await params;
  const booking = await getBooking(id, accessToken as string);

  const payAction = async () => {
    "use server";

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/payments/checkout/${id}`,
      {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.ok) {
      redirect("/payment/cancel");
    }

    const { checkoutUrl } = await res.json();
    redirect(checkoutUrl);
  };

  if (!booking) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold">Payment</h1>
        <p className="text-sm text-muted-foreground">Booking not found.</p>
      </div>
    );
  }

  const isPaid = booking.status === "PAID";

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Payment</h1>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Booking ID</span>
            <span className="font-medium">{booking.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount</span>
            <span className="font-medium">${booking.amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>
            <span className="font-medium">{booking.status}</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-2">
          <form action={payAction}>
            <Button type="submit" size="lg" className="w-full" disabled={isPaid}>
              {isPaid ? "Already Paid" : "Pay Now"}
            </Button>
          </form>
          <p className="text-center text-xs text-muted-foreground">
            You will be redirected to Stripe to complete payment.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PayPage;