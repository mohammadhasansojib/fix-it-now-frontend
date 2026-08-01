import Link from "next/link";
import { Clock, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDuration, formatPrice, type Service } from "@/lib/service";

// Server Component — no "use client" needed. The only interactive element
// is a Link (via Button asChild), which doesn't require client JS.
//
// Note: the card is a <div>, not a <Link>, because the "View details"
// button is itself a Link — nesting an <a> inside another <a> is invalid
// HTML. The `group` class still lets the whole card react on hover even
// though only the button is clickable.

type ServiceCardProps = {
  service: Service;
};

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="group flex items-stretch overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/10">
      <div className="flex w-24 shrink-0 items-center justify-center bg-muted sm:w-28">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-200 group-hover:scale-105">
          <Wrench className="h-5 w-5" />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="text-base font-semibold leading-tight text-foreground line-clamp-1">
            {service.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {service.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight text-foreground">
              {formatPrice(service.price)}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {formatDuration(service.durationMinutes)}
            </span>
          </div>

          
        </div>

        <Button asChild size="sm" className="mt-5">
            <Link href={`/services/${service.id}`}>View details</Link>
          </Button>
      </div>
    </div>
  );
};

export default ServiceCard;