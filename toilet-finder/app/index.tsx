import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import React from "react";
import { Platform } from "react-native";

import Header from "../components/Header";

function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />

      {/*<MapView />*/}
    </SafeAreaView>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
