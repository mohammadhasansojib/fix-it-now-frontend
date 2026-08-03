// app/dashboard/customer/bookings/page.tsx
import Link from "next/link";
import { cookies } from "next/headers";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Booking {
  id: string;
  startTime: string;
  endTime: string;
  status: string;
  amount: string;
}

const getAcceptedBookings = async (): Promise<Booking[]> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return [];

  const json = await res.json();
  const bookings: Booking[] = json.data.bookings;

  return bookings.filter((b) => b.status === "ACCEPTED");
};

const CustomerBookingsPage = async () => {
  const bookings = await getAcceptedBookings();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Bookings</h1>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader>
                <CardTitle className="text-base">
                  {new Date(booking.startTime).toLocaleString()}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">${booking.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium">{booking.status}</span>
                </div>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/customer/bookings/${booking.id}/pay`}>
                    Pay
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              No accepted bookings to pay for.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomerBookingsPage;