import Link from "next/link";
import { Clock, Tag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDuration, formatPrice, type Service } from "@/lib/service";
import { isAuthenticated } from "@/lib/auth/isAuthenticated";


type ServiceDetail = Service & {
  category?: { id: string; name: string };
  technician?: { id: string; name: string };
};

type ServiceApiResponse = {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    services: ServiceDetail[];
  };
};

export const getService = async (
  id: string
): Promise<ServiceDetail | null> => {

    try {
        // TODO:
        // Replace this with GET /api/services/:id
        // once the backend endpoint exists.
        
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/services`, {
            cache: "no-store",
        });

        if (!res.ok) {
            return null;
        }

        const result: ServiceApiResponse = await res.json();

        return result.data.services.find(
            service => service.id === id
        ) ?? null;
    } catch {
        return null;
    }

};

type ServiceDetailsProps = {
  service: ServiceDetail;
};

export const ServiceDetails = async ({ service }: ServiceDetailsProps) => {
  const authenticated = await isAuthenticated();
  const bookHref = authenticated ? "/dashboard/customer" : "/auth/login";

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        {service.title}
      </h1>

      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        {service.description}
      </p>

      <dl className="mt-8 space-y-4 rounded-xl border border-border p-6">
        <div className="flex items-center justify-between">
          <dt className="text-sm text-muted-foreground">Price</dt>
          <dd className="text-sm font-semibold text-foreground">
            {formatPrice(service.price)}
          </dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="text-sm text-muted-foreground">Duration</dt>
          <dd className="flex items-center gap-1 text-sm font-semibold text-foreground">
            <Clock className="h-4 w-4" />
            {formatDuration(service.durationMinutes)}
          </dd>
        </div>

        {service.category && (
          <div className="flex items-center justify-between">
            <dt className="text-sm text-muted-foreground">Category</dt>
            <dd className="flex items-center gap-1 text-sm font-semibold text-foreground">
              <Tag className="h-4 w-4" />
              {service.category.name}
            </dd>
          </div>
        )}

        {service.technician && (
          <div className="flex items-center justify-between">
            <dt className="text-sm text-muted-foreground">Technician</dt>
            <dd className="flex items-center gap-1 text-sm font-semibold text-foreground">
              <User className="h-4 w-4" />
              {service.technician.name}
            </dd>
          </div>
        )}
      </dl>

      <Button asChild size="lg" className="mt-8 w-full">
        <Link href={bookHref}>Book Now</Link>
      </Button>
    </div>
  );
};

export default ServiceDetails;