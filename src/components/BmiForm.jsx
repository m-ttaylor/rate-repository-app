import FormikTextInput from "./FormikTextInput";
import { View, Text, Pressable } from "react-native";
import { Formik } from "formik";

const BodyMassIndexForm = ({ onSubmit }) => {
  return (
    <View>
      <Formik>
      <FormikTextInput name="mass" placeholder="Weight (kg)" />
      <FormikTextInput name="height" placeholder="Height (m)" />
      <Pressable onPress={onSubmit}>
        <Text>Calculate</Text>
      </Pressable>
      </Formik>
    </View>
  );
};

export default BodyMassIndexForm;