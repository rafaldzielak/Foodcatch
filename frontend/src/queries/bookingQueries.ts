import { gql } from "@apollo/client";

export const getBookingQuery = gql`
  {
    booking {
      name
      id
      people
    }
  }
`;

export const createBookingMutation = gql`
  mutation CreateBooking($people: Int!, $phone: String!, $name: String!, $date: String!) {
    createBooking(people: $people, phone: $phone, name: $name, date: $date) {
      name
      people
      phone
    }
  }
`;
