export interface Service {
  id: string;
  title: string;
  category: string;
  price: string;
  duration: string;
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