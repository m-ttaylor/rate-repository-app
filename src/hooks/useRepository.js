import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = () => {
  const { id } = useParams();
  // console.log("repository id is", id);

  const { loading, data } = useQuery(GET_REPOSITORY, {
    variables: {id},
    fetchPolicy: 'cache-and-network'
  })

  return { repository: data ? data.repository : undefined, loading };
};

export default useRepository;