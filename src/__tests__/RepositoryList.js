import { RepositoryListContainer } from "../components/RepositoryList";

import { render } from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };
      
      const { debug, getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
      
      debug();

      const [firstRepositoryItem, secondRepositoryItem] = getAllByTestId("repositoryItem");
      
      expect(firstRepositoryItem).toHaveTextContent("jaredpalmer/formik"); // name
      expect(firstRepositoryItem).toHaveTextContent("Build forms in React, without the tears"); // description
      expect(firstRepositoryItem).toHaveTextContent("TypeScript"); // language
      expect(firstRepositoryItem).toHaveTextContent("21.86k"); // stars
      expect(firstRepositoryItem).toHaveTextContent("1.62k"); // forks
      expect(firstRepositoryItem).toHaveTextContent("88"); // average rating
      expect(firstRepositoryItem).toHaveTextContent("3"); // reviews

      expect(secondRepositoryItem).toHaveTextContent("async-library/react-async"); // name
      expect(secondRepositoryItem).toHaveTextContent("Flexible promise-based React data loader"); // description
      expect(secondRepositoryItem).toHaveTextContent("JavaScript"); // language
      expect(secondRepositoryItem).toHaveTextContent("1.76k"); // stars
      expect(secondRepositoryItem).toHaveTextContent("69"); // forks
      expect(secondRepositoryItem).toHaveTextContent("72"); // average rating
      expect(secondRepositoryItem).toHaveTextContent("3"); // reviews
    });
  });
});