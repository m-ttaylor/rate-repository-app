import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { Link } from 'react-router-native';

import { useApolloClient, useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,

    flexDirection: 'row'
  },
  topBar: {
    color: theme.colors.title,
    fontSize: theme.fontSizes.title,
    fontWeight: theme.fontWeights.bold,
  },
  appBarTab: {
    paddingTop: 40,
    paddingBottom: 8,
    padding: 4,
    flexGrow: 1,
  }
});

const AppBarTab = ({title, link, onPress}) => {

  return (
    <View style={styles.appBarTab}>
      <Link to={link} onPress={onPress}>
        <Text style={styles.topBar}>{title}</Text>
      </Link>
    </View>
  );
}

const AppBar = () => {
  let signedIn = false;
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const { data } = useQuery(GET_CURRENT_USER, { fetchPolicy: 'cache-and-network' });
  console.log("login data:", data);
  if (data?.me) {
    signedIn = data.me !== null ? data.me.id : false;
  }


  console.log("signin data", data)
  console.log("signedIn value", signedIn)  

  const signOut = async () => {
    console.log("signing out")
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  return (
  <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab title="Repositories" link="/"/>
        {signedIn ?
          <>
            <AppBarTab title="Sign Out" link="/" onPress={signOut} />
            <AppBarTab title="Create Review" link="createreview" />
            <AppBarTab title="My Reviews" link="userreviews" />
          </> :
          <>
            <AppBarTab title="Sign In" link="signin" /> 
            <AppBarTab title="Sign Up" link="signup" />
          </>
        }
      
    </ScrollView>
  </View>);
};

export default AppBar;