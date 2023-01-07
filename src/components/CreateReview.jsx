import { View, Pressable, Text, StyleSheet} from "react-native";
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from "../theme";
import * as yup from 'yup';
import useRepositories from "../hooks/useRepositories";
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "grey",
    padding: 4,
    marginVertical: 4,
    marginHorizontal: 4,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    borderStyle: "solid",
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    color: theme.colors.title,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    textAlign: "center"
  },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  review: ''
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
  .string()
  .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required'),
});

const ReviewForm = ({ onSubmit }) => {
  return(
    <View style={styles.container}>
      <View>
        <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      </View>
      <View>
        <FormikTextInput name="repositoryName" placeholder="Repository name" />
      </View>
      <View>
        <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      </View>
      <View>
        <FormikTextInput name="review" placeholder="Review" />
      </View>
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Create a Review</Text>
      </Pressable>
    </View>
  );
}

const CreateReviewContainer = ({onSubmit}) => {
  return (
    <Formik 
    initialValues={initialValues} 
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
  </Formik>
  );
}

const CreateReview = () => {
  const navigate = useNavigate();
  // const { repositories } = useRepositories();
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, review } = values;
    // const repositoryNodes = repositories
    // ? repositories.edges.map((edge) => edge.node)
    // : [];
    // const id = repositoryNodes
    //   .filter(n => n.fullName === repositoryName)
    //   .map(n => n.id)[0];
    // console.log("id of repository to review:", id)
    console.log(`attempting review repository ${repositoryName}`);

    try {
      const data = await createReview({ ownerName, repositoryName, rating, review })
      console.log('create review response data', data)
      if (data) {
        navigate(`/${data.createReview.repositoryId}`);
      }
      // console.log(data);
    } catch (e) {
      console.log(e);
    }
    // 
  };

  return (
    <CreateReviewContainer onSubmit={onSubmit} />
  );
};

export default CreateReview;