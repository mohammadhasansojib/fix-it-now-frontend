// app/dashboard/admin/page.tsx
import { cookies } from "next/headers";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/requireAdmin";

interface User {
  id: string;
  username: string;
  role: "CUSTOMER" | "TECHNICIAN";
  createdAt: string;
}

interface Booking {
  id: string;
  status: string;
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
  createdAt: string;
}

interface ActivityItem {
  label: string;
  createdAt: string;
}

const authHeaders = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  return { Authorization: `Bearer ${accessToken}` };
};

const getUsers = async (): Promise<User[]> => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
    headers: await authHeaders(),
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data.users;
};

const getBookings = async (): Promise<Booking[]> => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/bookings`, {
    headers: await authHeaders(),
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data.bookings;
};

const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/categories`, {
    headers: await authHeaders(),
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data.categories;
};

const AdminDashboardPage = async () => {
  const admin = await requireAdmin();

  const [users, bookings, categories] = await Promise.all([
    getUsers(),
    getBookings(),
    getCategories(),
  ]);

  const customerCount = users.filter((u) => u.role === "CUSTOMER").length;
  const technicianCount = users.filter((u) => u.role === "TECHNICIAN").length;

  const stats = [
    { label: "Customers", value: customerCount },
    { label: "Technicians", value: technicianCount },
    { label: "Bookings", value: bookings.length },
    { label: "Categories", value: categories.length },
  ];

  const activity: ActivityItem[] = [
    ...users.map((u) => ({
      label: `New ${u.role.toLowerCase()} registered: ${u.username}`,
      createdAt: u.createdAt,
    })),
    ...bookings.map((b) => ({
      label: `New booking created (${b.status.toLowerCase()})`,
      createdAt: b.createdAt,
    })),
    ...categories.map((c) => ({
      label: `New category added: ${c.name}`,
      createdAt: c.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 2);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Welcome back</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {activity.length > 0 ? (
            <ul className="flex flex-col gap-2 text-sm">
              {activity.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.label}</span>
                  <span className="text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No recent activity.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;