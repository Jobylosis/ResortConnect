export type UserRole = 'ADMIN' | 'OWNER' | 'TOURIST';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  propertyId?: string; // For Owners
}

export type PropertyType = 'Resort' | 'Hotel';

export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  rooms: number;
  amenities: string[];
  staffCount?: number;
  description: string;
  image: string;
  pricePerNight: number;
}

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  userName: string;
  checkIn: string; // ISO Date
  checkOut: string; // ISO Date
  roomNumber: number;
  status: 'PENDING' | 'APPROVED' | 'CANCELLED';
  totalPrice: number;
}

export interface AppState {
  users: User[];
  properties: Property[];
  bookings: Booking[];
  currentUser: User | null;
}
