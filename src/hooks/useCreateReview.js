import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";


const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, review }) => {
    // call the mutate function here with the right arguments
    const { data } = await mutate({ variables: { ownerName, repositoryName, rating: parseInt(rating), review } });
    console.log("DEBUG", data)
    return data;
  };

  return [createReview, result];
};

export default useCreateReview;