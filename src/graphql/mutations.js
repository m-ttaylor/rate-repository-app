import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation Login ($username: String!, $password: String!) { 
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($ownerName: String!, $repositoryName: String!, $rating: Int!, $text: String) {
    createReview(review: {ownerName: $ownerName, repositoryName: $repositoryName, rating: $rating, text: $text}) {
      repositoryId
    }
  }`
