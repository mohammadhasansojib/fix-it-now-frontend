"use server";

import { cookies } from "next/headers";

export async function createBooking(serviceId: string, startTime: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ serviceId, startTime }),
  });

  if (!res.ok) {
    throw new Error("Booking failed");
  }

  return res.json();
}