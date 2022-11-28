import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

const RepositoryItem = ({ fullName, description, language, stargazersCount, forksCount, reviewCount, ratingAverage }) => (
  <View style={styles.item}>
    <Text style={styles.title}>Full name: {fullName}</Text>
    <Text style={styles.title}>Description: {description}</Text>
    <Text style={styles.title}>Language: {language}</Text>
    <Text style={styles.title}>Stars: {stargazersCount}</Text>
    <Text style={styles.title}>Forks: {forksCount}</Text>
    <Text style={styles.title}>Reviews: {reviewCount}</Text>
    <Text style={styles.title}>Rating: {ratingAverage}</Text>
  </View>
);

export default RepositoryItem;