import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

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

const AppBarTab = ({title}) => {
  return(<Pressable style={styles.appBarTab} onPress={()=>console.log(`pressed the ${title} button`)}>
    <Text style={styles.topBar}>{title}</Text>
  </Pressable>);
}

const AppBar = () => {
  return (
  <View style={styles.container}>
    <AppBarTab title="Repositories" />
    <AppBarTab title="Test" />
  </View>);
};

export default AppBar;