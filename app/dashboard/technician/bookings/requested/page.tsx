// app/dashboard/technician/bookings/requested/page.tsx
import { cookies } from "next/headers";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { updateBookingStatus } from "./_actions/actions";

interface Booking {
  id: string;
  startTime: string;
  endTime: string;
  status: string;
  amount: string;
}

const getRequestedBookings = async (): Promise<Booking[]> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/technicians/bookings`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return [];

  const json = await res.json();
  const bookings: Booking[] = json.data.bookings;

  return bookings.filter((b) => b.status === "REQUESTED");
};

const RequestedBookingsPage = async () => {
  const bookings = await getRequestedBookings();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Requested Bookings</h1>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => {
            const acceptBooking = updateBookingStatus.bind(null, booking.id, "ACCEPTED");
            const declineBooking = updateBookingStatus.bind(null, booking.id, "DECLINED");

            return (
              <Card key={booking.id}>
                <CardHeader>
                  <CardTitle className="text-base">
                    {new Date(booking.startTime).toLocaleString()}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium">${booking.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium">{booking.status}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <form action={acceptBooking} className="flex-1">
                    <Button type="submit" className="w-full">
                      Accept
                    </Button>
                  </form>
                  <form action={declineBooking} className="flex-1">
                    <Button type="submit" variant="destructive" className="w-full">
                      Decline
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">No requested bookings.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RequestedBookingsPage;