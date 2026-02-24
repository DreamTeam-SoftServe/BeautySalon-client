export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  createdAt: string;
  role?: string;
}

export interface UserBooking {
  id: string;
  bookingId: string;
  serviceName: string;
  masterName: string;
  date: string;
  time: string;
  status: BookingStatus;
  price: number;
  notes?: string;
}

export type BookingStatus =
  | "schedule"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "in_progress";

export interface UpdateProfileDto {
  name: string;
  phone: string;
  email: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  expiresIn: number;
  user: User;
}
