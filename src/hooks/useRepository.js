import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (variables) => {
  const { id } = useParams();
  // console.log("repository id is", id);

  const { loading, data, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    variables: { ...variables, id },
    fetchPolicy: 'cache-and-network'
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { repository: data?.repository, fetchMore: handleFetchMore, loading, ...result };
};

export default useRepository;