"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const customerNavItems = [
  {
    label: "Dashboard",
    href: "/dashboard/customer",
    icon: LayoutDashboard,
  },
  {
    label: "Payable Bookings",
    href: "/dashboard/customer/bookings",
    icon: LayoutDashboard,
  },
];

const technicianNavItems = [
  {
    label: "Dashboard",
    href: "/dashboard/technician",
    icon: LayoutDashboard,
  },
  {
    label: "Requested Bookings",
    href: "/dashboard/technician/bookings/requested",
    icon: LayoutDashboard,
  },
  {
    label: "Services",
    href: "/dashboard/technician/services",
    icon: LayoutDashboard,
  },
  {
    label: "Connect Stripe",
    href: "/dashboard/technician/payment",
    icon: LayoutDashboard,
  },
]

const adminNavItems = [
  {
    label: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Categories",
    href: "/dashboard/admin/categories",
    icon: LayoutDashboard,
  },
]

interface DashboardNavProps {
  onNavigate?: () => void;
  role?: "ADMIN" | "CUSTOMER" | "TECHNICIAN";
}

export function DashboardNav({ onNavigate, role }: DashboardNavProps) {
  const pathname = usePathname();

  const navItems = role === "ADMIN"
                  ? adminNavItems
                  : role === "TECHNICIAN"
                  ? technicianNavItems
                  : customerNavItems;

  return (
    <nav aria-label="Dashboard navigation" className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}