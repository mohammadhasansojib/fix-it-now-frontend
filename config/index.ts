import { env } from "process"


export const config = {
    server: {
        backend_api_url: env.BACKEND_API_URL!,
    },
    client: {
        backend_api_url: env.NEXT_PUBLIC_BACKEND_API_URL!,
    },
}