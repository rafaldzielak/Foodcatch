import { gql } from "@apollo/client";

export const getBookingQuery = gql`
  query GetBooking($id: String, $readableId: String) {
    getBooking(id: $id, readableId: $readableId) {
      name
      id
      people
      readableId
    }
  }
`;

export const createBookingMutation = gql`
  mutation CreateBooking($people: Int!, $phone: String!, $name: String!, $date: String!) {
    createBooking(people: $people, phone: $phone, name: $name, date: $date) {
      readableId
      name
      people
      phone
    }
  }
`;
