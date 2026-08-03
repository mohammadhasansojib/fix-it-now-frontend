// app/dashboard/technician/payment/actions.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { requireTechnician } from "@/lib/auth/requireTechnician";

export const connectStripe = async () => {
  await requireTechnician();

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const connectRes = await fetch(`${process.env.BACKEND_API_URL}/api/payments/connect`, {
    method: "POST",
    headers,
  });

  if (!connectRes.ok) {
    console.error("Failed to connect Stripe account:", connectRes.status);
    return;
  }

  const onboardRes = await fetch(`${process.env.BACKEND_API_URL}/api/payments/onboard`, {
    method: "POST",
    headers,
  });

  if (!onboardRes.ok) {
    console.error("Failed to create onboarding link:", onboardRes.status);
    return;
  }

  const { data } = await onboardRes.json();
  redirect(data.url);
};