export const ENV = {
  API_BASE_URL:
    (import.meta as any).env?.VITE_API_BASE_URL ?? "http://localhost:5245",
} as const;
