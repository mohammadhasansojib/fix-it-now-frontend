import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "./getCurrentUser";


export const requireAdmin = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/auth/login");

  if (user.role !== "ADMIN") notFound();

  return user;
};