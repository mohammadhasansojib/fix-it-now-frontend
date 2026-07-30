import { env } from "process"


export const clientConfig = {
    backend_api_url: env.NEXT_PUBLIC_BACKEND_API_URL!,
}