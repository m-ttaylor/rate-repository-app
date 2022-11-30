import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,

    flexDirection: 'row'
    // backgroundColor: "black",
  // ...
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

const AppBarTab = ({title, link}) => {

  return (
    <View style={styles.appBarTab}>
      <Link to={link}>
        <Text style={styles.topBar}>{title}</Text>
      </Link>
    </View>
  );
}

const AppBar = () => {
  return (
  <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab title="Repositories" link="repositories"/>
      <AppBarTab title="Sign In" link="signin" />
    </ScrollView>
  </View>);
};

export default AppBar;