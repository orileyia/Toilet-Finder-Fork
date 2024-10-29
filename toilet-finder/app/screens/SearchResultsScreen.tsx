import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Image,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import ToiletSearchItem from "../components/ToiletSearchItem";
import { padding } from "../scripts/utils";

function SearchResultsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.searchItems}>
        <ToiletSearchItem />
        <ToiletSearchItem />
        <ToiletSearchItem />
      </View>
    </SafeAreaView>
  );
}

export default SearchResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  searchItems: {
    ...padding(15),
  },
});
