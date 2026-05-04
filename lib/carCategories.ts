import { apiFetch } from "./api";

export interface CarCategory {
  id: string;
  name: string;
  price: number;
  createdAt: string;
}

export interface CreateCarCategoryPayload {
  name: string;
  price: number;
}

export const carCategoryApi = {
  getAll: () =>
    apiFetch<CarCategory[]>("/api/carcategory"),

  getById: (id: string) =>
    apiFetch<CarCategory>(`/api/carcategory/${id}`),

  create: (data: CreateCarCategoryPayload) =>
    apiFetch<CarCategory>("/api/carcategory", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: CreateCarCategoryPayload) =>
    apiFetch<CarCategory>(`/api/carcategory/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiFetch<void>(`/api/carcategory/${id}`, { method: "DELETE" }),
};