// app/dashboard/technician/services/actions.ts
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const createService = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const durationMinutes = Number(formData.get("durationMinutes"));
  const price = Number(formData.get("price"));
  const categoryId = formData.get("categoryId") as string;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  await fetch(`${process.env.BACKEND_API_URL}/api/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      title,
      description,
      durationMinutes,
      price,
      categoryId,
    }),
  });

  revalidatePath("/dashboard/technician/services");
};