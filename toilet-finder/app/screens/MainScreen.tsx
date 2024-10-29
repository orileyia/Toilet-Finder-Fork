import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import React, { useState, useRef } from "react";
import { Platform } from "react-native";

import { MapView } from "../components/MapView";
import Header from "../components/Header";

function MainScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <MapView />
    </SafeAreaView>
  );
}

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
