'use client'

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  durationMinutes: number;
  technicianId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

interface ServiceCardProps {
  service: Service;
  onBook?: (serviceId: string) => void;
}

function formatDuration(minutes: number) {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs === 0) return `${mins} min`;
  if (mins === 0) return `${hrs} hr`;
  return `${hrs} hr ${mins} min`;
}

export default function ServiceCard({ service, onBook }: ServiceCardProps) {
  return (
    <Card className="border border-neutral-200 bg-white text-black transition-colors hover:border-neutral-400">
      <CardHeader className="space-y-1.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-tight">
            {service.title}
          </h3>
          <Badge
            variant="outline"
            className="shrink-0 border-neutral-300 text-neutral-600"
          >
            ${service.price}
          </Badge>
        </div>
        <p className="line-clamp-2 text-sm text-neutral-500">
          {service.description}
        </p>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-1.5 text-sm text-neutral-500">
          <Clock className="h-4 w-4" />
          <span>{formatDuration(service.durationMinutes)}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full bg-black text-white hover:bg-neutral-800"
          onClick={() => onBook?.(service.id)}
        >
          Book now
        </Button>
      </CardFooter>
    </Card>
  );
}