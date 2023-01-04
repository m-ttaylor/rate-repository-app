import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories {
    repositories {
      edges {
        node {
          fullName
          language
          description
          id
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation Login ($username: String!, $password: String!) { 
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }`;

// other queries...