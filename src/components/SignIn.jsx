import Text from './Text';
import useSignIn from '../hooks/useSignIn';
import { View, Pressable, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from "../theme";
import * as yup from 'yup';
import { useNavigate } from "react-router-native";


const styles = StyleSheet.create({
  container: {
    // backgroundColor: "grey",
    padding: 4,
    marginVertical: 4,
    marginHorizontal: 4,
  },
  item: {
    padding: 2,
    marginVertical: 2,
    marginHorizontal: 2,
  },
  repoName: {
    fontSize: theme.fontSizes.title,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textPrimary,
    padding: 2,
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
  statValue: {
    fontWeight: theme.fontWeights.bold,
  },
  statLabel: {
    fontColor: theme.colors.textSecondary,
  },
  statContainer: {
    flexDirection: "column",
    padding: 10,
    marginLeft: 6,
    marginRight: 6,
  },
  flexRow: {
    flexDirection: "row",
    alignSelf: "stretch",
    // marginHorizontal: 6,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginHorizontal: 2,
    padding: 2,
    borderRadius: 7,
  },
  flexColumn: {
    flexDirection: "column",
  }
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return(
    <View style={styles.container}>
      <View>
        <FormikTextInput name="username" placeholder="username" />
      </View>
      <View>
        <FormikTextInput secureTextEntry="true" name="password" placeholder="password" />
      </View>
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
}
export const SignInContainer = ({onSubmit}) => {
  return (
    <Formik 
    initialValues={initialValues} 
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
  </Formik>
  );
}

const SignIn = () => {

  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log(`attempting signin with username ${username} and password ${password}`);

    try {
      await signIn({ username, password });
      // console.log(data);
    } catch (e) {
      console.log(e);
    }
    navigate("/");
  };

  return (
    <SignInContainer onSubmit={onSubmit} />
  // <Formik 
  //   initialValues={initialValues} 
  //   validationSchema={validationSchema}
  //   onSubmit={onSubmit}
  // >
  //   {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
  // </Formik>
  );
};

export default SignIn;