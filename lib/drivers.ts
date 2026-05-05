import { apiFetch } from "./api";

export interface Driver {
  uid: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  status: string;
}

export interface CreateDriverPayload {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface UpdateDriverPayload {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  status: string;
}

export const driverApi = {
  getAll: () =>
    apiFetch<Driver[]>("/api/admin/drivers"),

  getById: (uid: string) =>
    apiFetch<Driver>(`/api/admin/drivers/${uid}`),

  create: (data: CreateDriverPayload) =>
    apiFetch<Driver>("/api/admin/drivers", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (uid: string, data: UpdateDriverPayload) =>
    apiFetch<Driver>(`/api/admin/drivers/${uid}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (uid: string) =>
    apiFetch<void>(`/api/admin/drivers/${uid}`, { method: "DELETE" }),
};