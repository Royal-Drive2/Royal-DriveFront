export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://royal-drive-api-702767093919.europe-west1.run.app";

export function authHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};
  const token = sessionStorage.getItem("rd_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options.headers ?? {}),
    },
  });

  if (res.status === 204) return undefined as T;

  const data = await res.json();

  if (!res.ok) {
    const message =
      data?.message ?? data?.error ?? `HTTP ${res.status}`;
    throw new Error(message);
  }

  return data as T;
}