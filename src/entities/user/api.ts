import { apiClient } from "../../shared/api/client";
import type {
  User,
  UserBooking,
  LoginDto,
  RegisterDto,
  AuthResponse,
  UpdateProfileDto,
} from "./model";

export const authApi = {
  register: (dto: RegisterDto) =>
    apiClient.post<AuthResponse>("/api/Auth/register", dto),
  login: (dto: LoginDto) =>
    apiClient.post<AuthResponse>("/api/Auth/login", dto),
  logout: () => apiClient.post<null>("/api/Auth/logout", {}),
};

export const userApi = {
  getMe: () => apiClient.get<User>("/api/Auth/me"),
  updateMe: (dto: UpdateProfileDto) =>
    apiClient.put<{ accessToken: string; user: User }>("/api/Auth/me", dto),
  getMyBookings: (id: string) =>
    apiClient.get<UserBooking[]>(
      `/api/ServiceAppointmentControllers/my-bookings/${id}`,
    ),
  cancelBooking: (id: string) =>
    apiClient.patch<null>(`/api/ServiceAppointmentControllers/${id}/cancel`),
};
