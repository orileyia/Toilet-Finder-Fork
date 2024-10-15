import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Platform } from "react-native";

function MainScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.menu}></View>
        <Text style={styles.headerText}>Toilet Finder</Text>
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
  menu: {
    width: 50,
    height: 50,
    backgroundColor: "#000",
    marginRight: 20,
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
