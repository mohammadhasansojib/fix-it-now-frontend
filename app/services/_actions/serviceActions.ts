'use server'

import { config } from "@/config"


export const getAllServiceAction = async () => {
    const res = await fetch(`${config.server.backend_api_url}/api/services`);
    const result = await res.json();

    
}