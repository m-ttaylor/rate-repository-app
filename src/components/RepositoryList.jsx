import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }) => (
  <RepositoryItem 
    fullName={item.fullName}
    description={item.description}
    language={item.language}
    forksCount={item.forksCount}
    stargazersCount={item.stargazersCount}
    ratingAverage={item.ratingAverage}
    reviewCount={item.reviewCount}
    avatarUrl={item.ownerAvatarUrl}
    id={item.id}
  />
);

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const { searchTerm, setSearchTerm, selectedSort, setSort } = this.props;

    return (
      <>
        <Searchbar
          placeholder=""
          onChangeText={(searchTerm) =>
            setSearchTerm(searchTerm)
          }
          value={searchTerm}
        />
        <Picker selectedValue={selectedSort} onValueChange={(itemValue) => setSort(itemValue)}>
          <Picker.Item label="latest repositories" value="latest" />
          <Picker.Item label="lowest rated repositories" value="lowestRated" />
          <Picker.Item label="highest rated repositories" value="highestRated" />
        </Picker>
      </>
    );
  };

  render() {
    const { repositories, onEndReach } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [selectedSort, setSelectedSort] = useState("latest");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchTerm
  });

  const setSort = (itemValue) => {
    setSelectedSort(itemValue);
    switch (itemValue) {
      case "highestRated":
        setOrderBy("RATING_AVERAGE");
        setOrderDirection("DESC");
        break;
      case "lowestRated": 
        setOrderBy("RATING_AVERAGE");
        setOrderDirection("ASC");
        break;
      case "latest": 
      default:
        setOrderBy("CREATED_AT");
        setOrderDirection("DESC");
        break;
    }
  }

  const onEndReach = () => {
    console.log('You have reached the end of the list');
    fetchMore();
  };

  return <>
    <RepositoryListContainer
      repositories={repositories}
      selectedSort={selectedSort}
      setSort={setSort}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onEndReach={onEndReach}/>
  </>;
};

export default RepositoryList;