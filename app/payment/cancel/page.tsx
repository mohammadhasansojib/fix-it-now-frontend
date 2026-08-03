// app/payment/cancel/page.tsx
import Link from "next/link";
import { CircleAlert } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm text-center">
        <CardHeader className="flex flex-col items-center gap-2">
          <CircleAlert className="h-12 w-12 text-amber-600" aria-hidden="true" />
          <CardTitle className="text-xl">Payment Cancelled</CardTitle>
          <CardDescription>
            Your payment was cancelled. You can try again whenever you&apos;re
            ready.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard/customer">Back to Dashboard</Link>
          </Button>
          <Button asChild className="w-full">
            <Link href="#">Try Again</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}