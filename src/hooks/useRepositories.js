import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  //  { orderBy, orderDirection, searchKeyword }
  
  const { loading, data, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: "cache-and-network"
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { repositories: data?.repositories, fetchMore: handleFetchMore, loading, ...result };
};

export default useRepositories;

// import { useQuery } from '@apollo/client';
// import { GET_REPOSITORIES } from '../graphql/queries';

// const useRepositories = ({ orderBy, orderDirection, searchKeyword}) => {

//   const { loading, data } = useQuery(GET_REPOSITORIES, {
//     fetchPolicy: 'cache-and-network', variables: { orderBy, orderDirection, searchKeyword }
//   });
//   return { repositories: data ? data.repositories : undefined, loading };
// };

// export default useRepositories;