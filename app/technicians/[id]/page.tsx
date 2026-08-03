import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Briefcase, DollarSign, User as UserIcon } from "lucide-react";
import StarRating from "../_components/Starrating";
import BookNowButton from "../_components/BookNowButton";

// Adjust this shape once you confirm the real review object fields
interface Review {
    id: string;
    rating: number;
    comment: string;
    customerName?: string;
    createdAt: string;
}

// Only the fields this page actually needs — never type/render passwordHash.
// The backend should exclude it from this response entirely.
interface TechnicianUser {
    id: string;
    username: string;
    email: string;
    role: string;
    isBanned: boolean;
}

interface Technician {
    id: string;
    bio: string;
    userId: string;
    profilePhoto: string | null;
    price: string;
    skills: string[];
    experience: string | null;
    createdAt: string;
    updatedAt: string;
    reviews: Review[];
    user: TechnicianUser;
}

async function getTechnician(id: string): Promise<Technician | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/technicians/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) return null;

        const result = await res.json();
        return result.data.technician as Technician;
    } catch (err) {
        console.error("Failed to fetch technician:", err);
        return null;
    }
}

export default async function TechnicianPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const technician = await getTechnician(id);

    if (!technician) {
        return (
            <div className="mx-auto max-w-4xl px-4 py-10 text-center sm:px-6 lg:px-8">
                <p className="text-sm text-neutral-500">Technician not found.</p>
            </div>
        );
    }

    const avgRating =
        technician.reviews.length > 0
            ? technician.reviews.reduce((sum, r) => sum + r.rating, 0) / technician.reviews.length
            : 0;

    return (
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
            {/* Profile header */}
            <Card className="border-neutral-200 bg-white">
                <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
                    <Avatar className="h-24 w-24 border border-neutral-200">
                        <AvatarImage
                            src={technician.profilePhoto ?? undefined}
                            alt={technician.user.username}
                        />
                        <AvatarFallback className="bg-neutral-100">
                            <UserIcon className="h-10 w-10 text-neutral-400" />
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="text-xl font-semibold text-black">
                                {technician.user.username}
                            </h1>
                            {technician.user.isBanned && (
                                <Badge variant="destructive" className="text-xs">
                                    Banned
                                </Badge>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                            <div className="flex items-center gap-1">
                                <StarRating rating={avgRating} />
                                <span>
                                    {avgRating > 0 ? avgRating.toFixed(1) : "No ratings"} ({technician.reviews.length} reviews)
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                <span>${technician.price} / service</span>
                            </div>
                            {technician.experience && (
                                <div className="flex items-center gap-1">
                                    <Briefcase className="h-4 w-4" />
                                    <span>{technician.experience}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* <BookNowButton technicianId={technician.id} /> */}
                </CardContent>
            </Card>

            {/* About + Skills */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="sm:col-span-2">
                    <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                        About
                    </h2>
                    <p className="text-sm leading-relaxed text-neutral-700">{technician.bio}</p>
                </div>

                <div>
                    <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                        Skills
                    </h2>
                    {technician.skills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {technician.skills.map((skill) => (
                                <Badge key={skill} variant="outline" className="border-neutral-300 text-neutral-700">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-neutral-400">No skills listed.</p>
                    )}
                </div>
            </div>

            <Separator className="my-8 bg-neutral-200" />

            {/* Reviews */}
            <div>
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                    Reviews ({technician.reviews.length})
                </h2>

                {technician.reviews.length === 0 ? (
                    <p className="text-sm text-neutral-400">No reviews yet.</p>
                ) : (
                    <div className="space-y-4">
                        {technician.reviews.map((review) => (
                            <Card key={review.id} className="border-neutral-200 bg-white">
                                <CardContent className="p-4">
                                    <div className="mb-1 flex items-center justify-between">
                                        <span className="text-sm font-medium text-black">
                                            {review.customerName ?? "Anonymous"}
                                        </span>
                                        <StarRating rating={review.rating} />
                                    </div>
                                    <p className="text-sm text-neutral-600">{review.comment}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}