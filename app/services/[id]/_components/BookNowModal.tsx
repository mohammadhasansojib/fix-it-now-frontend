// app/services/[id]/_components/BookNowModal.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBooking } from "../_actions/bookingActions";

type BookNowModalProps = {
  serviceId: string;
  authenticated: boolean;
};

export const BookNowModal = ({ serviceId, authenticated }: BookNowModalProps) => {

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    if (!authenticated) {
      router.push("/auth/login");
      return;
    }
    setOpen(true);
  };

  const handleConfirm = async () => {
    if (!startTime) return;

    setLoading(true);
    try {

      await createBooking(serviceId, new Date(startTime).toISOString());
      setOpen(false);

      router.push("/dashboard/customer");

    } catch (err) {

      console.error(err);

      alert("Something went wrong. Please try again.");
      alert(err);

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      <Button size="lg" className="mt-8 w-full" onClick={handleOpen}>
        Book Now
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select date & time</DialogTitle>
          </DialogHeader>

          <div className="py-2">
            <Input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button
              onClick={handleConfirm}
              disabled={!startTime || loading}
            >
              {loading ? "Booking..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};