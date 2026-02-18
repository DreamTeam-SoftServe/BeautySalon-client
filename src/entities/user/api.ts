// entities/user/api.ts
//
// Maps to ASP.NET Core C# controllers:
//
//   POST   /api/auth/register   → AuthResponse   (AccountController)
//   POST   /api/auth/login      → AuthResponse
//   POST   /api/auth/logout     → 204
//   GET    /api/account/me      → User            (requires [Authorize])
//   PUT    /api/account/me      → User
//   GET    /api/account/bookings → UserBooking[]  (requires [Authorize])
//   DELETE /api/account/bookings/{id} → 204

import { apiClient } from '../../shared/api/client'
import type {
  User,
  UserBooking,
  LoginDto,
  RegisterDto,
  AuthResponse,
  UpdateProfileDto,
} from './model'

export const authApi = {
  register: (dto: RegisterDto)  => apiClient.post<AuthResponse>('/api/auth/register', dto),
  login:    (dto: LoginDto)     => apiClient.post<AuthResponse>('/api/auth/login', dto),
  logout:   ()                  => apiClient.post<null>('/api/auth/logout', {}),
}

export const userApi = {
  getMe:          ()                       => apiClient.get<User>('/api/account/me'),
  updateMe:       (dto: UpdateProfileDto)  => apiClient.put<User>('/api/account/me', dto),
  getMyBookings:  ()                       => apiClient.get<UserBooking[]>('/api/account/bookings'),
  cancelBooking:  (id: string)             => apiClient.delete<null>(`/api/account/bookings/${id}`),
}
