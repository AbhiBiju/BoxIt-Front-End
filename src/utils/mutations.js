import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_BOX = gql`
  mutation addBox(
    $packingDate: String
    $name: String!
    $description: String
    $images: [String]
    $price: Float
    $isMoving: Boolean!
    $isFragile: Boolean!
    $userId: ID!
  ) {
    addBox(
      packingDate: $packingDate
      name: $name
      description: $description
      images: $images
      price: $price
      isMoving: $isMoving
      isFragile: $isFragile
      userId: $userId
    ) {
      _id
      packingDate
      name
      description
      images
      price
    }
  }
`;
