// app/dashboard/technician/page.tsx
import { cookies } from "next/headers";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { requireTechnician } from "@/lib/auth/requireTechnician";

interface Booking {
  id: string;
  startTime: string;
  status: string;
  amount: string;
}

interface BookingsResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    bookings: Booking[];
  };
}

const getTechnicianBookings = async (): Promise<Booking[]> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/technicians/bookings`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  const json: BookingsResponse = await res.json();
  return json.data.bookings;
};

const TechnicianDashboardPage = async () => {
  const technician = await requireTechnician();

  const bookings = await getTechnicianBookings();

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
          <CardTitle>Recent Booking Requests</CardTitle>
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
            <p className="text-sm text-muted-foreground">No booking requests.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicianDashboardPage;