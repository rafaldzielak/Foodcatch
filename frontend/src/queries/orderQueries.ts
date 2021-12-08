import { gql } from "@apollo/client";

export const createOrderMutation = gql`
  mutation CreateOrder(
    $date: String!
    $phone: String!
    $dish: DishInput!
    $firstName: String!
    $surname: String!
    $street: String!
    $streetNumber: String!
    $city: String!
    $paymentMethod: String!
  ) {
    createOrder(
      date: $date
      phone: $phone
      dish: $dish
      firstName: $firstName
      surname: $surname
      street: $street
      streetNumber: $streetNumber
      city: $city
      paymentMethod: $paymentMethod
    ) {
      date
      phone
      dish {
        name
      }
      firstName
      surname
      street
      streetNumber
      city
      paymentMethod
    }
  }
`;
