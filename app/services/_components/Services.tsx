'use client'

import { useEffect, useState } from "react";
import ServiceCard, { Service } from "./ServiceCard";

const Services = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllServices = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/services`);
                const result = await res.json();
                setServices(result.data.services);
            } catch (err) {
                console.error("Failed to fetch services:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchAllServices();
    }, []);

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-black">Services</h2>
                <p className="mt-1 text-sm text-neutral-500">
                    Browse available services from our technicians.
                </p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-48 animate-pulse rounded-xl border border-neutral-200 bg-neutral-100"
                        />
                    ))}
                </div>
            ) : services.length === 0 ? (
                <p className="text-sm text-neutral-500">No services available right now.</p>
            ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {services.map((service: Service) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onBook={(id) => console.log(id)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Services;