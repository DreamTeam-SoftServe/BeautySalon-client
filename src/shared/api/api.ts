import { apiClient } from '../api/client'
import { ENV } from '../config/env';

export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  icon: string;
}

export interface Master {
  id: string;
  name: string;
  role: string;
  services: string[]; 
  imageUrl?: string;  
}

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  serviceId: string;
  date: string;
  time: string;
  masterId?: string;
  notes?: string;
}

export const api = {
  getServices: () => apiClient.get<Service[]>('/api/ServiceControllers'),  
  getMasters: () => apiClient.get<Master[]>('/api/Master'),
  
  submitBooking: (data: BookingData) => {
    const combinedDateTime = new Date(`${data.date}T${data.time}:00`).toISOString();

    const payloadForBackend = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      serviceId: data.serviceId,
      masterId: data.masterId,
      start_date: combinedDateTime
    };

    console.log("SEND", payloadForBackend);

    return apiClient.post<{ success: boolean; clientId: string }>(
      "/api/ServiceAppointmentControllers",
      payloadForBackend
    );
  },

  getBusySlots: async (masterId: string, date: string): Promise<string[]> => {
    const url = `/api/Master/${masterId}/busy-slots?date=${date}`;
    return apiClient.get<string[]>(url);
  },

  setPassword: async (phone: string, password: string) => {
    const response = await fetch(`${ENV.API_BASE_URL}/api/auth/set-password`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ 
        phone: phone, 
        newPassword: password 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to set password');
    }

    return response.json();
  }
};