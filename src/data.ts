import { Property, User, Booking } from './types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'casa-delrio',
    name: 'Casa Delrio',
    type: 'Resort',
    rooms: 11,
    amenities: ['Pool', 'Pavilion'],
    staffCount: 7,
    description: 'A serene riverside resort perfect for family gatherings and peaceful retreats.',
    image: 'https://picsum.photos/seed/casa/800/600',
    pricePerNight: 2500,
  },
  {
    id: 'nadzville',
    name: 'Nadzville',
    type: 'Resort',
    rooms: 11,
    amenities: ['Pool x2', 'Pavilion x3'],
    description: 'Luxury resort with multiple pools and spacious pavilions for grand events.',
    image: 'https://picsum.photos/seed/nadz/800/600',
    pricePerNight: 3500,
  },
  {
    id: 'hotel-ramiro',
    name: 'Hotel Ramiro',
    type: 'Hotel',
    rooms: 17,
    amenities: ['Restaurant'],
    description: 'Modern hotel in the heart of the city featuring a world-class restaurant.',
    image: 'https://picsum.photos/seed/ramiro/800/600',
    pricePerNight: 1800,
  },
];

export const INITIAL_USERS: User[] = [
  {
    id: 'u1',
    name: 'Global Admin',
    email: 'admin@hospira.com',
    role: 'ADMIN',
  },
  {
    id: 'u2',
    name: 'Casa Owner',
    email: 'owner@casa.com',
    role: 'OWNER',
    propertyId: 'casa-delrio',
  },
  {
    id: 'u3',
    name: 'Nadzville Owner',
    email: 'owner@nadzville.com',
    role: 'OWNER',
    propertyId: 'nadzville',
  },
  {
    id: 'u4',
    name: 'Ramiro Owner',
    email: 'owner@ramiro.com',
    role: 'OWNER',
    propertyId: 'hotel-ramiro',
  },
  {
    id: 'u5',
    name: 'John Tourist',
    email: 'john@gmail.com',
    role: 'TOURIST',
  },
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    propertyId: 'casa-delrio',
    userId: 'u5',
    userName: 'John Tourist',
    checkIn: '2024-06-01',
    checkOut: '2024-06-03',
    roomNumber: 1,
    status: 'APPROVED',
    totalPrice: 5000,
  },
];
