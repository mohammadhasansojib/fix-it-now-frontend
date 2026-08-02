import Link from "next/link";

const ServiceNotFound = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center sm:px-6">
      <span className="text-sm font-medium tracking-widest text-muted-foreground">
        404
      </span>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        Service not found
      </h1>

      <p className="mt-3 max-w-sm text-sm text-muted-foreground sm:text-base">
        This service may have been removed or is no longer available.
      </p>

      <Link
        href="/services"
        className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        Browse all services
      </Link>
    </div>
  );
};

export default ServiceNotFound;