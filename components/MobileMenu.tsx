"use client";

// Client Component — owns open/close state (useState) for the Sheet,
// so it must run in the browser.

import { FC, useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import type { NavLink } from "./Navbar";

type MobileMenuProps = {
  links: NavLink[];
  isAuthenticated: boolean;
};

export const MobileMenu: FC<MobileMenuProps> = ({ links, isAuthenticated }) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-72 flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <span className="text-base font-semibold">Menu</span>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label="Close menu">
              <X className="h-5 w-5" />
            </Button>
          </SheetClose>
        </div>

        <nav className="flex flex-col gap-1 py-4">
          {links.map((link) => (
            <SheetClose asChild key={link.label}>
              <a
                href={link.href}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
              >
                {link.label}
              </a>
            </SheetClose>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-border flex flex-col gap-2">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 px-1 pb-2">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-foreground text-background">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">Hasan</p>
                  <p className="text-muted-foreground text-xs">
                    View profile
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="w-full">
                Log in
              </Button>
              <Button className="w-full">Sign up</Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;