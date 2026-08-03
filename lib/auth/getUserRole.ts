import jwt, { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'


export const getUserRole = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) return undefined;

  const decoded = jwt.decode(accessToken) as JwtPayload | null;

  if (!decoded) return undefined;

  return decoded.role as "CUSTOMER" | "TECHNICIAN" | "ADMIN";
};