// app/dashboard/customer/page.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { requireCustomer } from "@/lib/auth/requireCustomer";
import { cookies } from "next/headers";

interface Booking {
  id: string;
  startTime: string;
  endTime: string;
  status: string;
  amount: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  createdAt: string;
  updatedAt: string;
}

interface BookingsResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    bookings: Booking[];
  };
}

const getBookings = async (): Promise<Booking[]> => {
  try {
      const cookieStore = await cookies();

      const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings`, {
        cache: "no-store",
        headers: {
          'Authorization': `Bearer ${cookieStore.get("access_token")?.value}`,
        }
      });

      if (!res.ok) {
        return [];
      }

      const json: BookingsResponse = await res.json();
      return json.data.bookings;

  } catch {
    return []
  }
};

const CustomerDashboardPage = async () => {

  const user = await requireCustomer();

  const bookings = await getBookings();

  const totalCount = bookings.length;
  const acceptedCount = bookings.filter((b) => b.status === "ACCEPTED").length;
  const paidCount = bookings.filter((b) => b.status === "PAID").length;

  const stats = [
    { label: "Total Bookings", value: totalCount },
    { label: "Accepted", value: acceptedCount },
    { label: "Paid", value: paidCount },
  ];

  const recentBooking = bookings.length > 0 ? bookings[0] : null;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Welcome back</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {recentBooking ? (
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium">{recentBooking.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">${recentBooking.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">
                  {new Date(recentBooking.startTime).toLocaleDateString()}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No bookings yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDashboardPage;