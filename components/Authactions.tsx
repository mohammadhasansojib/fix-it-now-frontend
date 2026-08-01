"use client";

// Client Component — needs Radix's dropdown primitives (click handling,
// portals, focus trapping), which only work in the browser.

import { FC } from "react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

type AuthActionsProps = {
  isAuthenticated: boolean;
};

export const AuthActions: FC<AuthActionsProps> = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return (
      <>
        <Button variant="ghost" size="sm">
          <Link href="/auth/login">
            Log in
          </Link>
        </Button>
        <Button size="sm">
            <Link href="/auth/register">
                Register
          </Link>
        </Button>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-foreground text-background">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>My bookings</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600 focus:text-red-600">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthActions;