import { gql } from "@apollo/client";

export const useCouponQuery = gql`
  query UseCoupon($couponApplied: String!) {
    useCoupon(couponApplied: $couponApplied) {
      couponName
      percentage
      validUntil
    }
  }
`;

export const createOrderMutation = gql`
  mutation CreateOrder(
    $date: String!
    $phone: String!
    $dishes: [DishInput]!
    $firstName: String!
    $surname: String!
    $email: String!
    $street: String!
    $streetNumber: String!
    $city: String!
    $paymentMethod: String!
    $couponApplied: String
    $notes: String
  ) {
    createOrder(
      date: $date
      phone: $phone
      dishes: $dishes
      firstName: $firstName
      surname: $surname
      email: $email
      street: $street
      streetNumber: $streetNumber
      city: $city
      paymentMethod: $paymentMethod
      couponApplied: $couponApplied
      notes: $notes
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
      notes
      firstName
      surname
      street
      email
      streetNumber
      city
      paymentMethod
      couponAppliedPercentage
    }
  }
`;

export const editOrderMutation = gql`
  mutation EditOrder(
    $id: String!
    $isDelivered: Boolean
    $date: String
    $phone: String
    $dishes: [DishInput]
    $firstName: String
    $surname: String
    $email: String
    $street: String
    $streetNumber: String
    $city: String
    $paymentMethod: String
  ) {
    editOrder(
      id: $id
      isDelivered: $isDelivered
      date: $date
      phone: $phone
      dishes: $dishes
      firstName: $firstName
      surname: $surname
      email: $email
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
      notes
      firstName
      surname
      street
      email
      streetNumber
      city
      paymentMethod
      couponAppliedPercentage
      orderPaymentId
      orderPaymentProvider
      isPaid
      isDelivered
    }
  }
`;

export const deleteOrderMutation = gql`
  mutation DeleteOrderOrder($id: String!) {
    deleteOrder(id: $id) {
      id
      date
      phone
      dishes {
        name
        imgURL
        price
        quantity
      }
      notes
      firstName
      surname
      street
      email
      streetNumber
      city
      paymentMethod
      couponAppliedPercentage
      orderPaymentId
      orderPaymentProvider
      isPaid
      isDelivered
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
      notes
      paymentUrl
      isPaid
      isDelivered
      email
      firstName
      surname
      street
      streetNumber
      city
      paymentMethod
      couponAppliedPercentage
    }
  }
`;

export const getOrdersQuery = gql`
  query GetOrders(
    $page: Int
    $id: String
    $firstName: String
    $surname: String
    $email: String
    $date: String
    $phone: String
  ) {
    getOrders(
      page: $page
      id: $id
      firstName: $firstName
      surname: $surname
      email: $email
      date: $date
      phone: $phone
    ) {
      orders {
        id
        date
        phone
        dishes {
          name
          imgURL
          price
          quantity
        }
        notes
        email
        firstName
        surname
        street
        streetNumber
        city
        paymentMethod
        couponAppliedPercentage
        orderPaymentId
        orderPaymentProvider
        isPaid
        isDelivered
      }
      count
      page
      allPages
    }
  }
`;
