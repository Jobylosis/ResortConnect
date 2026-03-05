import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Property, Booking, UserRole } from '../types';
import { INITIAL_USERS, INITIAL_PROPERTIES, INITIAL_BOOKINGS } from '../data';

interface AppContextType {
  users: User[];
  properties: Property[];
  bookings: Booking[];
  currentUser: User | null;
  login: (email: string) => void;
  logout: () => void;
  addBooking: (booking: Omit<Booking, 'id'>) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users] = useState<User[]>(INITIAL_USERS);
  const [properties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_USERS[4]); // Default to Tourist for demo

  const login = (email: string) => {
    const user = users.find((u) => u.email === email);
    if (user) setCurrentUser(user);
  };

  const logout = () => setCurrentUser(null);

  const addBooking = (newBooking: Omit<Booking, 'id'>) => {
    const id = `b${bookings.length + 1}`;
    setBookings([...bookings, { ...newBooking, id }]);
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
  };

  return (
    <AppContext.Provider value={{ 
      users, 
      properties, 
      bookings, 
      currentUser, 
      login, 
      logout, 
      addBooking,
      updateBookingStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
