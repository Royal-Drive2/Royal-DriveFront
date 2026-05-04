import { apiFetch } from "./api";
import { CarCategory } from "./carCategories";

export interface Car {
  id: string;
  name: string;
  plateNumber: string;
  categoryId: string;
  imageUrl: string;
  options: string[];
  isAvailable: boolean;
  createdAt: string;
  category?: CarCategory;
}

export interface CreateCarPayload {
  name: string;
  plateNumber: string;
  categoryId: string;
  imageUrl: string;
  options: string[];
  isAvailable: boolean;
}

export const carApi = {
  getAll: (params?: { search?: string; categoryId?: string; page?: number; pageSize?: number }) => {
    const qs = new URLSearchParams();
    if (params?.search) qs.set("search", params.search);
    if (params?.categoryId) qs.set("categoryId", params.categoryId);
    if (params?.page) qs.set("page", String(params.page));
    if (params?.pageSize) qs.set("pageSize", String(params.pageSize));
    return apiFetch<Car[]>(`/api/car?${qs.toString()}`);
  },

  getById: (id: string) =>
    apiFetch<Car>(`/api/car/${id}`),

  create: (data: CreateCarPayload) =>
    apiFetch<Car>("/api/car", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: CreateCarPayload) =>
    apiFetch<Car>(`/api/car/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiFetch<void>(`/api/car/${id}`, { method: "DELETE" }),
};

export async function uploadCarImage(file: File): Promise<string> {
  const { API_BASE, authHeaders } = await import("./api");
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/api/upload`, {
    method: "POST",
    headers: { ...authHeaders() },
    body: formData,
  });

  if (!res.ok) throw new Error("Image upload failed");
  const data = await res.json();
  return data.url as string;
}