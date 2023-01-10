import { Text, View, StyleSheet, FlatList, Pressable, Alert, Linking } from "react-native";
import { format } from "date-fns";

import theme from '../theme';
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";
import useDeleteReview from "../hooks/useDeleteReview";

const styles = StyleSheet.create({
  separator: {
    height: 15,
    // padding: 5,
    backgroundColor: theme.colors.lightOutline,
  },
  button: {
    borderRadius: 10,
    padding: 20,
    margin: 10,
    borderStyle: "solid",
    backgroundColor: theme.colors.primary,
    alignSelf: "stretch",
  },
  deleteButton: {
    borderRadius: 10,
    padding: 20,
    margin: 10,
    borderStyle: "solid",
    backgroundColor: "red",
    alignSelf: "stretch",
  },
  buttonText: {
    color: theme.colors.title,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    textAlign: "center"
  },
  usernameLabel: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
  },
  dateLabel: {
    color: theme.colors.textSecondary,
    marginBottom: 10,
  },
  reviewText: {
    textAlign: "auto",
    marginRight: 45,
  },
  flexRow: {
    flexDirection: "row",
    alignSelf: "stretch",
    padding: 10,
    margin: 3,
  },
  flexColumn: {
    flexDirection: "column",
    padding: 10,
    marginLeft: 8,
    marginRight: 8,
  },
  rating: {
    borderRadius: 25,
    width: 50,
    height: 50,
    padding: 13,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  ratingLabel: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    // textAlign: "center",
  },
  repositoryInfo: {
    marginBottom: 15,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, onConfirmDelete }) => {
  // Single review item
  console.log(review);

  const viewRepositoryPress = () => {
    Linking.openURL(review.repository.url);
  };
  
  const deletePress = () => {
    Alert.alert("Delete Review", "Are you sure you want to delete this review?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Delete", onPress: () => onConfirmDelete(review.id) }
    ]);
  };

  const date = format(new Date(review.createdAt), "MM/dd/yyyy")
  return (
    <View>

      <View style={styles.flexRow}>
        <View style={styles.rating}>
          <Text style={styles.ratingLabel}>{review.rating}</Text>
        </View>

        <View style={styles.flexColumn}>
          <View>
            <Text style={styles.usernameLabel}>{review.user.username}</Text>
          </View>
          <View>
            <Text style={styles.dateLabel}>{date}</Text>
          </View>
          <View >
            <Text style={styles.reviewText}>{review.text}</Text>
          </View>
        </View>
      </View>  

      <View style={styles.flexRow}>
        <Pressable onPress={viewRepositoryPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>View Repository</Text>
          </View>
        </Pressable>
        <Pressable onPress={deletePress}>
          <View style={styles.deleteButton}>
            <Text style={styles.buttonText}>Delete Review</Text>
          </View>
        </Pressable>
      </View>
    
    </View>
  )
};

const UserReviewsContainer = ({reviews, onConfirmDelete}) => {
  const reviewNodes = reviews
    ? reviews.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      // ListHeaderComponent={this.renderHeader}
      renderItem={({ item }) => <ReviewItem review={item} onConfirmDelete={onConfirmDelete} />}
      keyExtractor={item => item.id}
      // onEndReached={onEndReach}
      // onEndReachedThreshold={0.5}
    />
  );
}
const UserReviews = () => {
  const { data, refetch } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true }
  })

  const [deleteReview] = useDeleteReview();
  const reviews = data?.me.reviews;

  console.log(data?.me);

  const onConfirmDelete = async (deleteReviewId) => {
    try {
      const data = await deleteReview({ deleteReviewId });
      console.log("delete review response data", data);
      if (data) {
        refetch({includeReviews: true});
      }
    } catch (e) {
      console.log(e);
    }
  }
  return <>
    <UserReviewsContainer
      reviews={reviews}
      onConfirmDelete={onConfirmDelete}
      // onEndReach={onEndReach}
    />
  </>;
};

export default UserReviews;