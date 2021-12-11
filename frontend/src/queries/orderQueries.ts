import { gql } from "@apollo/client";

export const createOrderMutation = gql`
  mutation CreateOrder(
    $date: String!
    $phone: String!
    $dishes: [DishInput]!
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
      dishes: $dishes
      firstName: $firstName
      surname: $surname
      street: $street
      streetNumber: $streetNumber
      city: $city
      paymentMethod: $paymentMethod
    ) {
      id
      date
      phone
      dishes {
        name
        imgURL
        price
        quantity
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

export const getOrderQuery = gql`
  query GetOrder($id: String!) {
    getOrder(id: $id) {
      id
      date
      phone
      dishes {
        name
        imgURL
        price
        quantity
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
