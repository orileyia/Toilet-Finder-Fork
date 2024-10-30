import { StyleSheet, View } from "react-native";
import React from "react";

import ToiletSearchItem from "../components/ToiletSearchItem";
import { padding } from "../scripts/utils";

function SearchResultsScreen() {
  return (
    <View style={styles.searchItems}>
      <ToiletSearchItem />
      <ToiletSearchItem />
      <ToiletSearchItem />
    </View>
  );
}

export default SearchResultsScreen;

const styles = StyleSheet.create({
  searchItems: {
    ...padding(15),
  },
});
