import { apiFetch } from "./api";

// ─── Types ───────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  accessToken?: string;
  idToken?: string;  
  admin?: {
    uid: string;
    email: string;
    displayName: string;
    phoneNumber: string;
    isSuperAdmin: boolean;
  };
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  displayName: string;
  phoneNumber: string;
  isSuperAdmin: boolean;
}

export interface AdminProfile {
  displayName: string;
  phoneNumber: string;
  email: string;
}

export interface UpdateProfilePayload {
  displayName: string;
  phoneNumber: string;
  email: string;
}

// ─── API ─────────────────────────────────────────────────

export const authApi = {
  // POST /api/admin/auth/login
  login: (data: LoginPayload) =>
    apiFetch<LoginResponse>("/api/admin/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // POST /api/admin/auth/verify-token
  verifyToken: (token: string) =>
    apiFetch<void>("/api/admin/auth/verify-token", {
      method: "POST",
      body: JSON.stringify(token),
    }),

  // POST /api/admin/auth/forgot-password
  forgotPassword: (data: ForgotPasswordPayload) =>
    apiFetch<void>("/api/admin/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // POST /api/admin/register
  register: (data: RegisterPayload) =>
    apiFetch<void>("/api/admin/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // GET /api/admin/profil
  getProfile: () =>
    apiFetch<AdminProfile>("/api/admin/profile"),

  // PUT /api/admin/profil
  updateProfile: (data: UpdateProfilePayload) =>
    apiFetch<void>("/api/admin/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
    
};

export interface CompanyInfo {
  name: string;
  email: string;
  phoneNumber: string;
  city: string;
}

export const companyApi = {
  get: () => apiFetch<CompanyInfo>("/api/admin/company"),
  update: (data: CompanyInfo) =>
    apiFetch<void>("/api/admin/company", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};