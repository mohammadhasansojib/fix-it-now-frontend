import { ServiceCard } from "./ServiceCard";
import type { Service } from "@/lib/service";

// Server Component (async) — fetches on the server, no useEffect/useState.
// The route's own loading.tsx is shown automatically by Next while this
// component's fetch is in flight, so no manual loading state needed here.

type ServicesApiResponse = {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    services: Service[];
  };
};

// Shape kept ready for future query params (?page, ?category, ?search,
// ?sort) — not implemented yet, just wired through so adding it later
// only touches this function, not the page or the card.
type ServicesSearchParams = {
  page?: string;
  category?: string;
  search?: string;
  sort?: string;
};

const getServices = async (
  searchParams?: ServicesSearchParams
): Promise<Service[]> => {
  // TODO: once the backend supports filtering/pagination, build a query
  // string here, e.g.:
  //   const qs = new URLSearchParams(
  //     Object.entries(searchParams ?? {}).filter(([, v]) => v)
  //   ).toString();
  //   fetch(`${...}/api/services?${qs}`)
  void searchParams;

    try {
        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/services`,
            { cache: "no-store" }
        );

        if (!res.ok) return [];

        const result: ServicesApiResponse = await res.json();
        return result.data.services;
    } catch {
        return [];
    }

};

type ServicesProps = {
  searchParams?: ServicesSearchParams;
};

export const Services = async ({ searchParams }: ServicesProps) => {
  const services = await getServices(searchParams);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground">Services</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse available services from our technicians.
        </p>
      </div>

      {services.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No services available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;