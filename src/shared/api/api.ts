const API_BASE_URL = 'http://localhost:5245'; 

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
}

export const api = {
  getServices: async () => {
    const response = await fetch(`${API_BASE_URL}/api/ServiceControllers`);
    if (!response.ok) throw new Error('Помилка завантаження послуг');
    return response.json(); 
  },

  getMasters: async () => {
    const response = await fetch(`${API_BASE_URL}/api/Master`);
    if (!response.ok) throw new Error('Помилка завантаження майстрів');
    return response.json();
  },

  submitBooking: async (data: BookingData): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/api/ServiceAppointmentControllers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    });
    
    return response.json();
  }
};

export class ApiError extends Error {
  public readonly status: number
  public readonly body: unknown

  constructor(message: string, status: number, body: unknown) {
    super(message)
    this.name   = 'ApiError'
    this.status = status
    this.body   = body
  }
}