import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy!, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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
  }`;

export const ME = gql`{
  me {
    id
    username
  }
}`;

export const GET_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      fullName
      url
      language
      description
      id
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }`;