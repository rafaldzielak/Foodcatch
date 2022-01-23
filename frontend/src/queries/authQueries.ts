import { gql } from "@apollo/client";

export const loginUserMutation = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      email
      isAdmin
    }
  }
`;
