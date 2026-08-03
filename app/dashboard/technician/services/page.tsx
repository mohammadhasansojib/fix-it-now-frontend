// app/dashboard/technician/services/page.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { requireTechnician } from "@/lib/auth/requireTechnician";
import { CreateServiceDialog } from "./_components/CreateServiceDialog";

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  durationMinutes: number;
  technicianId: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
}

type Role = "TECHNICIAN" | "CUSTOMER" | "ADMIN";

interface TechnicianProfile {
  id: string;
  bio: string;
  userId: string;
  profilePhoto: string | null;
  price: string;
  skills: string[];
  experience: string | null;
  stripeAccountId: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
  technicianProfile: TechnicianProfile;
}

const getServices = async (): Promise<Service[]> => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/services`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data.services;
};

const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data.categories;
};

const TechnicianServicesPage = async () => {
  const technician = await requireTechnician();
  const technicianProfileId = (technician as User).technicianProfile.id;

  const [allServices, categories] = await Promise.all([
    getServices(),
    getCategories(),
  ]);

  const services = allServices.filter(
    (s) => s.technicianId === technicianProfileId
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Services</h1>
        <CreateServiceDialog categories={categories} />
      </div>

      {services.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 text-sm">
                <p className="text-muted-foreground">{service.description}</p>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-medium">${service.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{service.durationMinutes} min</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">No services yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TechnicianServicesPage;