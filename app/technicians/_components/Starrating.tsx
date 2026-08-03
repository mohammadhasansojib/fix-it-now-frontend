import { Star } from "lucide-react";

interface StarRatingProps {
    rating: number;
}

// Pure presentational — no state, no events — safe to render on the server.
export default function StarRating({ rating }: StarRatingProps) {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`h-4 w-4 ${
                        i < Math.round(rating) ? "fill-black text-black" : "text-neutral-300"
                    }`}
                />
            ))}
        </div>
    );
}