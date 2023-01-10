import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import UserReviews from './UserReviews';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>   
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="signin" element={<SignIn />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path=":id" element={<SingleRepository />} />
        <Route path="createReview" element={<CreateReview />} exact />
        <Route path="userreviews" element={<UserReviews />}  exact />
        <Route path="signup" element={<SignUp />} exact />
      </Routes>
    </View>
  );
};

export default Main;