import { DashboardNav } from "./DashboardNav";

export function DashboardSidebar() {
  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <span className="text-lg font-semibold">FixItNow</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <DashboardNav />
      </div>
    </aside>
  );
}