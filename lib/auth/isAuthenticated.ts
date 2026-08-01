
import { cookies } from "next/headers"

export const isAuthenticated = async () => {
    const cookieStore = await cookies();

    if (cookieStore.get("access_token")?.value) {
        return true;
    }

    return false;
}