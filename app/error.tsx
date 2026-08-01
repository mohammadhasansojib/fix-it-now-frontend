"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  useEffect(() => {
    
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-4 text-center">
      <span className="text-sm font-medium tracking-widest text-muted-foreground">
        ERROR
      </span>

      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Something went wrong
      </h1>

      <p className="max-w-sm text-sm text-muted-foreground sm:text-base">
        An unexpected error occurred. Try again, or head back to the
        homepage.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => reset()}>Try again</Button>
        <Button variant="outline" asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;