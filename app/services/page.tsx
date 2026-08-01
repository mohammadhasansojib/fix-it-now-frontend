import { Services } from "./_components/Services";

// Note: in Next.js 15+, `searchParams` is a Promise and must be awaited.
// If you're on Next 14, drop the Promise<...> wrapper and the `await`.
type ServicesPageProps = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
    sort?: string;
  }>;
};

const ServicesPage = async ({ searchParams }: ServicesPageProps) => {
  const resolvedSearchParams = await searchParams;

  return <Services searchParams={resolvedSearchParams} />;
};

export default ServicesPage;