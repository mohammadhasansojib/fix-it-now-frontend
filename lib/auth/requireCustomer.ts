import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "./getCurrentUser";


export const requireCustomer = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/auth/login");

  if (user.role !== "CUSTOMER") notFound();

  return user;
};