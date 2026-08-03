import { DashboardSidebar } from "./_components/DashboardSidebar";
import { DashboardHeader } from "./_components/DashboardHeader";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const role = user?.role;

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar role={role as ("ADMIN" | "CUSTOMER" | "TECHNICIAN")} />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}