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
  register:(dto: RegisterDto) => apiClient.post<AuthResponse>('/api/AuthControllers/register', dto),
  login: (dto: LoginDto) => apiClient.post<AuthResponse>('/api/AuthControllers/login', dto),
  logout: () => apiClient.post<null>('/api/AuthControllers/logout', {}),
}

export const userApi = {  
  
  getMe: () => apiClient.get<User>('/api/AuthControllers/me'),
  updateMe: (dto: UpdateProfileDto) => apiClient.put<{ accessToken: string, user: User }>('/api/AuthControllers/me', dto),
  getMyBookings: (id: string) => apiClient.get<UserBooking[]>(`/api/ServiceAppointmentControllers/my-bookings/${id}`),
  cancelBooking:  (id: string) => apiClient.patch<null>(`/api/ServiceAppointmentControllers/${id}/cancel`),
}
