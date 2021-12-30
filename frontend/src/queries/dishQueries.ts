import { gql } from "@apollo/client";

export const createDishMutation = gql`
  mutation CreateDish(
    $name: String!
    $imgURL: String!
    $price: Float!
    $description: String!
    $isVege: Boolean!
    $isSpicy: Boolean!
    $type: String!
  ) {
    createDish(
      name: $name
      imgURL: $imgURL
      price: $price
      description: $description
      isVege: $isVege
      isSpicy: $isSpicy
      type: $type
    ) {
      name
      imgURL
      price
      quantity
      id
      description
      isVege
      isSpicy
      type
    }
  }
`;
