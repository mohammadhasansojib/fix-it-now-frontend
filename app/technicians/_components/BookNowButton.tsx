'use client'

import { Button } from "@/components/ui/button";

interface BookNowButtonProps {
    technicianId: string;
}

export default function BookNowButton({ technicianId }: BookNowButtonProps) {
    const handleBook = () => {
        console.log("book", technicianId);
        // TODO: navigate to booking flow or open a booking modal
    };

    return (
        <Button
            className="w-full bg-black text-white hover:bg-neutral-800 sm:w-auto"
            onClick={handleBook}
        >
            Book now
        </Button>
    );
}