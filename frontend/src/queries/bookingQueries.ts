import { gql } from "@apollo/client";

export const getBookingQuery = gql`
  query GetBooking($id: String, $readableId: String) {
    getBooking(id: $id, readableId: $readableId) {
      date
      name
      email
      id
      people
      readableId
    }
  }
`;

export const createBookingMutation = gql`
  mutation CreateBooking($people: Int!, $phone: String!, $name: String!, $date: String!, $email: String!) {
    createBooking(people: $people, phone: $phone, name: $name, date: $date, email: $email) {
      readableId
      email
      name
      people
      phone
    }
  }
`;

export const getBookingsQuery = gql`
  query GetBookings(
    $page: Int
    $id: String
    $people: Int
    $readableId: String
    $name: String
    $email: String
    $date: String
    $phone: String
  ) {
    getBookings(
      page: $page
      id: $id
      readableId: $readableId
      people: $people
      name: $name
      email: $email
      date: $date
      phone: $phone
    ) {
      bookings {
        date
        name
        email
        id
        phone
        people
        readableId
      }
      count
      page
      allPages
    }
  }
`;
