import { cookies } from "next/headers";

export type CurrentUser = {
  id: string;
  username: string;
  email: string;
  role: string;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
};

type MeApiResponse = {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    user: CurrentUser;
  };
};

export const getCurrentUser = async (): Promise<CurrentUser | null> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return null;
    }

    const result: MeApiResponse = await res.json();

    return result.data.user;
  } catch {
    return null;
  }
};