import Link from "next/link";
import AuthActions from "./Authactions";
import { MobileMenu } from "./MobileMenu";

export type NavLink = {
  label: string;
  href: string;
};

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
];


const IS_AUTHENTICATED = false;

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo — static, server-rendered */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-background font-bold text-sm">
            FI
          </div>
          <span className="text-lg font-semibold tracking-tight">
            FixItNow
          </span>
        </Link>

        {/* Nav links — static, server-rendered */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side — desktop. Client component: needs Radix dropdown state */}
        <div className="hidden md:flex items-center gap-3">
          <AuthActions isAuthenticated={IS_AUTHENTICATED} />
        </div>

        {/* Mobile trigger + sheet. Client component: needs useState */}
        <div className="md:hidden">
          <MobileMenu links={NAV_LINKS} isAuthenticated={IS_AUTHENTICATED} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;