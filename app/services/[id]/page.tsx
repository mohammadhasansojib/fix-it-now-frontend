import { notFound } from "next/navigation";
import { getService, ServiceDetails } from "./_components/ServiceDetails";

type ServiceDetailPageProps = {
  params: Promise<{ id: string }>;
};

const ServiceDetailPage = async ({ params }: ServiceDetailPageProps) => {
  const { id } = await params;
  const service = await getService(id);

  if (!service) {
    notFound();
  }

  return <ServiceDetails service={service} />;
};

export default ServiceDetailPage;