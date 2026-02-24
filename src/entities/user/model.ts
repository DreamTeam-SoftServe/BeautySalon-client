
export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatarUrl?: string
  createdAt: string
}

export interface UserBooking {
  id: string
  bookingId: string
  serviceName: string
  masterName: string
  date: string        // 'YYYY-MM-DD'
  time: string        // 'HH:mm'
  status: BookingStatus
  price: number
  notes?: string
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'cancelled'

export interface UpdateProfileDto {
  name: string
  phone: string
  email: string;
}

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  name: string
  email: string
  phone: string
  password: string
}

export interface AuthResponse {
  accessToken: string
  expiresIn: number
  user: User
}
