// app/dashboard/technician/bookings/requested/actions.ts
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const updateBookingStatus = async (
  bookingId: string,
  status: "ACCEPTED" | "DECLINED"
) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/technicians/bookings/${bookingId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("Failed to update booking status:", res.status, errorBody);
    return;
  }

  revalidatePath("/dashboard/technician/bookings/requested");
};