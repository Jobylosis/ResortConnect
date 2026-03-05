import { isWithinInterval, parseISO } from 'date-fns';
import { useAppContext } from '../context/AppContext';

export const useAvailability = () => {
  const { bookings, properties } = useAppContext();

  const checkAvailability = (propertyId: string, checkIn: string, checkOut: string) => {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return { available: false, roomNumber: null };

    const start = parseISO(checkIn);
    const end = parseISO(checkOut);

    // Simple logic: find a room number from 1 to property.rooms that isn't booked in this interval
    for (let i = 1; i <= property.rooms; i++) {
      const isBooked = bookings.some(booking => {
        if (booking.propertyId !== propertyId || booking.roomNumber !== i || booking.status === 'CANCELLED') {
          return false;
        }

        const bStart = parseISO(booking.checkIn);
        const bEnd = parseISO(booking.checkOut);

        // Check if intervals overlap
        return (
          isWithinInterval(start, { start: bStart, end: bEnd }) ||
          isWithinInterval(end, { start: bStart, end: bEnd }) ||
          isWithinInterval(bStart, { start, end })
        );
      });

      if (!isBooked) {
        return { available: true, roomNumber: i };
      }
    }

    return { available: false, roomNumber: null };
  };

  return { checkAvailability };
};
