import Link from "next/link";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background font-bold text-xs">
            FI
          </div>
          <span className="text-sm font-semibold tracking-tight">
            FixItNow
          </span>
        </Link>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground text-center">
          &copy; {year} FixItNow. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;