import { MobileSidebar } from "./MobileSidebar";

export function DashboardHeader() {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
      <MobileSidebar />
      <span className="text-lg font-semibold lg:hidden">FixItNow</span>
    </header>
  );
}