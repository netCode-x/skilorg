export const  apiConfig={
    baseURL: import.meta.env.VITE_API_BASE_URL  || 'http://localhost:8888',
    timeout: Number(import.meta.env.VITE_API_TIMEOUT_MS) || 10000
}

export const  API_PREFIX='/api'