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

export const getDishesQuery = gql`
  {
    getDishes {
      id
      name
      imgURL
      price
      description
      isVege
      isSpicy
      type
    }
  }
`;

export const getDishQuery = gql`
  query getDish($id: String!) {
    getDish(id: $id) {
      id
      name
      imgURL
      price
      description
      isVege
      isSpicy
      type
    }
  }
`;

export const editDishMutation = gql`
  mutation EditDish(
    $name: String
    $imgURL: String
    $price: Float
    $description: String
    $isVege: Boolean
    $isSpicy: Boolean
    $type: String
    $id: String!
  ) {
    editDish(
      id: $id
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

export const deleteDishMutation = gql`
  mutation deleteDish($id: String!) {
    deleteDish(id: $id) {
      id
    }
  }
`;
