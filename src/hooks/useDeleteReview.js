import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async ({ deleteReviewId }) => {
    // call the mutate function here with the right arguments
    const { data } = await mutate({ variables: { deleteReviewId } });
    console.log("DEBUG", data)
    return data;
  };

  return [deleteReview, result];
};

export default useDeleteReview;