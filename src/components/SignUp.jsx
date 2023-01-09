import Text from './Text';
import useSignIn from '../hooks/useSignIn';
import { View, Pressable, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from "../theme";
import * as yup from 'yup';
import { useNavigate } from "react-router-native";
import useCreateUser from '../hooks/useCreateUser';


const styles = StyleSheet.create({
  container: {
    padding: 4,
    marginVertical: 4,
    marginHorizontal: 4,
  },
  item: {
    padding: 2,
    marginVertical: 2,
    marginHorizontal: 2,
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
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords don't match")
    .required("Password confirmation is required")
});

const SignUpForm = ({ onSubmit }) => {
  return(
    <View style={styles.container}>
      <View>
        <FormikTextInput name="username" placeholder="username" />
      </View>
      <View>
        <FormikTextInput secureTextEntry="true" name="password" placeholder="password" />
      </View>
      <View>
        <FormikTextInput secureTextEntry="true" name="passwordConfirmation" placeholder="password" />
      </View>
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
}
export const SignUpContainer = ({onSubmit}) => {
  return (
    <Formik 
    initialValues={initialValues} 
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
  </Formik>
  );
}

const SignUp = () => {

  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log(`attempting to create user with username ${username} and password ${password}`)

    let data = undefined;

    try {
      data = await createUser({ username, password });
    } catch (e) {
      console.log(e);
    }

    if (data) {
      console.log(`successfully created user ${username}`);
      try {
        const token = await signIn({ username, password });
        if (token) {
          navigate("/");
        }
      } catch (e) {
        console.log(e);
      }
    }
    navigate("/");
  };

  return (
    <SignUpContainer onSubmit={onSubmit} />
  );
};

export default SignUp;