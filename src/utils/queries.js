import { gql } from "@apollo/client";

export const QUERY_BOXES = gql`
  query getUserBoxes($userId: ID!) {
    getUserBoxes(userId: $userId) {
      _id
      packingDate
      name
      description
      images
      price
    }
  }
`;

export const QUERY_SINGLE_BOX = gql`
  query getSingleBox($boxId: ID!) {
    singleBox(boxId: $boxId) {
      _id
      packingDate
      name
      description
      images
      price
    }
  }
`;

export const QUERY_USER_BOXES = gql`
  {
    user {
      firstName
      lastName
      email
      boxes {
        _id
        packingDate
        name
        description
        images
        price
      }
    }
  }
`;
