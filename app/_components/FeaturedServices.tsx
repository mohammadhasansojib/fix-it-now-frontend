import Link from "next/link";
import { Clock, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

// Server Component (async) — fetches real service listings from your backend.

type Service = {
  id: string;
  title: string;
  description: string;
  price: string;
  durationMinutes: number;
  technicianId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
};

type ServicesApiResponse = {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    services: Service[];
  };
};

const getFeaturedServices = async (): Promise<Service[]> => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/services`, {
    next: { revalidate: 3600 }, // cache 1hr; use { cache: "no-store" } if it must always be fresh
  });

  if (!res.ok) {
    // Don't crash the homepage over this section — render it empty instead.
    return [];
  }

  const json: ServicesApiResponse = await res.json();
  return json.data.services.slice(0, 5);
};

const formatPrice = (price: string) => {
  const value = Number(price);
  return Number.isFinite(value) ? `$${value.toFixed(2)}` : price;
};

const formatDuration = (minutes: number) => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours}h ${rest}m` : `${hours}h`;
};

export const FeaturedServices = async () => {
  const services = await getFeaturedServices();

  if (services.length === 0) {
    return null;
  }

  return (
    <section className="w-full border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Popular services
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Booked recently by customers near you.
            </p>
          </div>
          <Link
            href="/services"
            className="hidden shrink-0 text-sm font-medium underline-offset-4 hover:underline sm:inline-block"
          >
            View all services
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services`}
              className="group flex flex-col gap-3 rounded-lg border border-border p-5 transition-colors hover:bg-accent"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-foreground text-background">
                <Wrench className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold">{service.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>

              <div className="mt-auto flex items-center justify-between pt-2 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {formatDuration(service.durationMinutes)}
                </span>
                <span className="font-semibold">
                  {formatPrice(service.price)}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline">
            <Link href="/services">View all services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;