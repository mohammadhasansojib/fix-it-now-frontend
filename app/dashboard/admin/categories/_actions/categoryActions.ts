// app/dashboard/admin/categories/actions.ts
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const createCategory = async (formData: FormData) => {
  const name = formData.get("name") as string;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  await fetch(`${process.env.BACKEND_API_URL}/api/admin/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ name }),
  });

  revalidatePath("/dashboard/admin/categories");
};