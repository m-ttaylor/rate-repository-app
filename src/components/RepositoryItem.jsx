import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";
import theme from "../theme";
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
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
  description: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.textSecondary,
    padding: 6,
    marginRight: 20,
  },
  languageTag: {
    borderRadius: 10,
    padding: 10,
    borderStyle: "solid",
    backgroundColor: theme.colors.primary,
    alignSelf: "flex-start",
  },
  language: {
    color: theme.colors.title,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
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

const processLargeCount = (value) => {
  if (value >= 1000) {
    return `${(value/1000).toFixed(2)}k`
    
  }
}

const RepositoryItem = ({ fullName, description, language, stargazersCount, forksCount, reviewCount, ratingAverage, avatarUrl }) => (
  
  <View style={styles.container}>
    <View style={styles.flexRow} >
      <Image style={styles.tinyLogo} source={{uri: avatarUrl}}/>
      <View style={styles.flexColumn}>
        <View style={styles.item}><Text style={styles.repoName}>{fullName}</Text></View>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.languageTag}>
          <Text style={styles.language}>{language}</Text>
        </View>
      </View>
    </View>
    
    <View style={styles.flexRow}>
      <View style={styles.statContainer}>
        <Text style={styles.statValue}>{processLargeCount(stargazersCount)}</Text>
        <Text style={styles.statLabel}>Stars</Text>
      </View>

      <View style={styles.statContainer}>
        <Text style={styles.statValue}>{processLargeCount(forksCount)}</Text>
        <Text style={styles.statLabel}>Forks</Text>
      </View>

      <View style={styles.statContainer}>
        <Text style={styles.statValue}>{reviewCount}</Text>
        <Text style={styles.statLabel}>Reviews</Text>
      </View>

      <View style={styles.statContainer}>
        <Text style={styles.statValue}>{ratingAverage}</Text>
        <Text style={styles.statLabel}>Rating</Text>
      </View>
    </View>
    
  </View>
);

export default RepositoryItem;