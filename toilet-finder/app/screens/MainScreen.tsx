import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { Platform } from "react-native";

import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

function MainScreen() {
  const [isSearching, setSearch] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Feather name="menu" size={35} color="black" />
        <View style={styles.middle}>
          {isSearching ? (
            <TextInput placeholder="Select location" style={styles.searchBar} />
          ) : (
            <Text style={styles.headerText}>Toilet Finder</Text>
          )}
        </View>
        <TouchableWithoutFeedback onPress={() => setSearch(true)}>
          <AntDesign name="search1" size={24} color="black" />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.map}>
        <Text>Map</Text>
      </View>
    </SafeAreaView>
  );
}

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...padding(0, 20),
  },
  headerText: {
    fontSize: 20,
  },
  map: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuLeft: {
    flexDirection: "row",
  },
  middle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  searchBar: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flex: 1,
  },
});

function padding(
  a: number,
  b?: number | undefined,
  c?: number | undefined,
  d?: number | undefined
) {
  return {
    paddingTop: a,
    paddingRight: b ?? a,
    paddingBottom: c ?? a,
    paddingLeft: d ?? b ?? a,
  };
}
