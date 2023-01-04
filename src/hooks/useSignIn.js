import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";

import useAuthStorage from '../hooks/useAuthStorage';


const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_IN);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const { data } = await mutate({ variables: { username, password } });
    console.log("DEBUG", data)
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();

    const foo = await authStorage.getAccessToken();
    console.log(foo);
    return data;
  };

  return [signIn, result];
};

export default useSignIn;