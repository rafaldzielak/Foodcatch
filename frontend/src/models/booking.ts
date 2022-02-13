export interface Booking {
  id: string;
  people: number;
  phone: string;
  name: string;
  email: string;
  date: string;
  readableId?: string;
}

export interface BookingsResponse {
  bookings: Booking[];
  count: number;
  page: number;
  allPages: number;
}
