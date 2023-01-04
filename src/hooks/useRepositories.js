import { useQuery } from '@apollo/client';
// import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {


  // const [repositories, setRepositories] = useState();
  // const [loading, setLoading] = useState(false);

  const {loading, data} = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  })

  if (data) {
      console.log("DEBUG: result is")
      console.log(data.repositories)
  }
  // console.log(result)


  // const fetchRepositories = async () => {
    
  //   if (!loading && data) {
  //     // setRepositories(data.repositories);

  //     console.log("DEBUG: result is")
  //     console.log(data.repositories)
  //   }
    
  // }

  // const fetchRepositories = async () => {
  //   setLoading(true);

  //   // Replace the IP address part with your own IP address!
  //   const response = await fetch('http://192.168.50.207:5001/api/repositories');
  //   const json = await response.json();

  //   setLoading(false);
  //   setRepositories(json);
  // };

  // useEffect(() => {
  //   fetchRepositories();
  // }, []);

  return { repositories: data ? data.repositories : undefined, loading };
};

export default useRepositories;