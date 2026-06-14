import { apiClient } from "./client";
import { ENV } from "../config/env";

export interface Service {
  id: string;
  title: string;
  serviceType: number;
  description?: string;
  servicePrice: number;
  duration: number;
  imageUrl?: string;
  icon?: string;
  isTraining?: boolean;
}

export interface Master {
  id: string;
  name: string;
  role: string;
  profLevel: number;
  experience?: string;
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
  isTraining?: boolean;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: number; // Maps to ProductCategory enum
  price: number;
  stock: number;
  description: string;
  volume: number;
  imgUrl: string;
}

export interface OrderItemData {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface CreateOrderData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  deliveryType: string;
  items: OrderItemData[];
}

export interface OrderItemData {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface OrderData {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  deliveryType: string;
  status: number;
  totalPrice: number;
  items: OrderItemData[];
  createdAt: string;
}



export const api = {
  getServices: () => apiClient.get<Service[]>("/api/Service"),

  createService: (data: Omit<Service, "id">) =>
    apiClient.post<Service>("/api/Service", data),

  updateService: (id: string, data: any) =>
    apiClient.put<Service>(`/api/Service/${id}`, data),

  deleteService: (id: string) => apiClient.delete(`/api/Service/${id}`),

  getMasters: () => apiClient.get<Master[]>("/api/Master"),

  createMaster: (data: any) => {
    return apiClient.post("/api/Master", data);
  },

  updateMaster: (id: string, data: any) =>
    apiClient.put(`/api/Master/${id}`, data),

  deleteMaster: (id: string) => apiClient.delete(`/api/Master/${id}`),

  submitBooking: (data: BookingData, clientId?: string) => {
    const combinedDateTime = `${data.date}T${data.time}:00`;

    const payloadForBackend = {
      CientId: clientId,
      name: data.name,
      phone: data.phone,
      email: data.email,
      serviceId: data.serviceId,
      masterId: data.masterId,
      start_date: combinedDateTime,
      notes: data.notes,
    };

    return apiClient.post<{ success: boolean; clientId: string }>(
      "/api/ServiceAppointmentControllers",
      payloadForBackend,
    );
  },

  getBusySlots: async (masterId: string, date: string): Promise<string[]> => {
    const url = `/api/Master/${masterId}/busy-slots?date=${date}`;
    return apiClient.get<string[]>(url);
  },

  getAdminBookings: async () => {
    return apiClient.get<any[]>(
      "/api/ServiceAppointmentControllers/admin-list",
    );
  },

  getMasterBookings: async () => {
    return apiClient.get<any[]>(
      "/api/ServiceAppointmentControllers/master-list",
    );
  },

  updateBookingStatus: async (bookingId: string, newStatus: string) => {
    const response = await fetch(
      `${ENV.API_BASE_URL}/api/ServiceAppointmentControllers/${bookingId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newStatus: newStatus }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return response.json();
  },

  getAllUsers: async () => {
    return apiClient.get<any[]>("/api/Auth/users");
  },

  getClientsCount: () => apiClient.get<number>("/api/Client/count"),

  deleteUser: (id: string) => apiClient.delete(`/api/Client/${id}`),

  updateUserRole: async (
    userId: string,
    newRole: string,
    masterProfileId?: string,
  ) => {
    return apiClient.patch(`/api/Auth/users/${userId}/role`, {
      role: newRole,
      masterProfileId: masterProfileId,
    });
  },

  setPassword: async (phone: string, password: string) => {
    const response = await fetch(`${ENV.API_BASE_URL}/api/auth/set-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone,
        newPassword: password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to set password");
    }

    return response.json();
  },

  changePassword: (data: ChangePasswordData) => {
    return apiClient.post("/api/Auth/change-password", data);
  },

  forgotPassword: async (email: string) => {
  return apiClient.post("/auth/forgot-password", { email });
  },

  uploadImage: (file: File, folder: string = "general") => {
    const formData = new FormData();
    formData.append("file", file);

    return apiClient.post<{ url: string }>(
      `/api/Upload/image?folder=${folder}`,
      formData,
    );
  },

  // --- Product Endpoints ---
  getProducts: () => apiClient.get<Product[]>("/api/Product"),
  getProductById: (id: string) => apiClient.get<Product>(`/api/Product/${id}`), // <--- Додано
  createProduct: (data: Omit<Product, "id">) => apiClient.post<Product>("/api/Product", data),
  updateProduct: (id: string, data: Partial<Product>) => apiClient.put<Product>(`/api/Product/${id}`, data),
  deleteProduct: (id: string) => apiClient.delete(`/api/Product/${id}`),  
  
  // --- Order Endpoints ---
  submitOrder: (data: CreateOrderData) =>
    apiClient.post<{ success: boolean; orderId: string }>("/api/Order", data),

  getOrdersAdmin: () => apiClient.get<OrderData[]>("/api/Order"),

  updateOrderStatus: (id: string, newStatus: number) =>
    apiClient.patch(`/api/Order/${id}/status`, { newStatus }),
};
