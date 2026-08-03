import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "./getCurrentUser";


export const requireTechnician = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/auth/login");

  if (user.role !== "TECHNICIAN") notFound();

  return user;
};