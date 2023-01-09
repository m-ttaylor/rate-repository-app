import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ orderBy, orderDirection, searchKeyword}) => {

  const { loading, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network', variables: { orderBy, orderDirection, searchKeyword }
  });
  return { repositories: data ? data.repositories : undefined, loading };
};

export default useRepositories;