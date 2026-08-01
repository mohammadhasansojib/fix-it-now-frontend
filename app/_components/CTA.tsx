import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col items-center gap-8 rounded-2xl bg-foreground px-6 py-12 text-center text-background sm:px-12 sm:py-16 md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Ready to get started?
            </h2>
            <p className="mt-2 max-w-md text-sm text-background/70 sm:text-base">
              Book a trusted technician today, or join FixItNow as a pro and
              grow your business.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90"
            >
              <Link href="/services">
                Book a service
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
            >
              <Link href="/auth/register">Create Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;