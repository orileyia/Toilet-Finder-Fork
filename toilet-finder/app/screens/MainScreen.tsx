import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useRef } from "react";
import { Platform } from "react-native";

import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

function MainScreen() {
  const [isSearching, setSearch] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current;

  const toggleMenu = () => { //sidebar animation
    if (isMenuOpen) {
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuOpen(false));
    } else {
      setMenuOpen(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={isSearching ? () => setSearch(false) : toggleMenu}>
          {isSearching ? (
            <AntDesign name="arrowleft" size={35} color="white" />
          ) : isMenuOpen ? (
            <AntDesign name="arrowleft" size={35} color="white" onPress={toggleMenu} />
          ) : (
            <Feather name="menu" size={35} color="white" onPress={toggleMenu} />
          )}
        </TouchableWithoutFeedback>
        <View style={styles.middle}>
          {isSearching ? (
            <TextInput
              placeholder="Select location"
              placeholderTextColor="#cccccc"
              style={styles.searchBar}
            />
          ) : (
            <Text style={styles.headerText}>Toilet Finder</Text>
          )}
        </View>
        <TouchableWithoutFeedback onPress={() => setSearch(true)}>
          <AntDesign name="search1" size={24} color="white" />
        </TouchableWithoutFeedback>
      </View>

      {isMenuOpen && (
        <TouchableOpacity style={styles.overlay} onPress={toggleMenu} />
      )}
      <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
        <Text style={styles.sidebarText}>Log in</Text>
        <Text style={styles.sidebarText}>Register</Text>
        <Text style={styles.sidebarText}>Settings</Text>
        <Text style={styles.sidebarText}>Help</Text>
      </Animated.View>

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
    backgroundColor: "#007acc",
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...padding(0, 20),
  },
  headerText: {
    fontSize: 20,
    color: "white",
    fontWeight: "600",
  },
  map: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  middle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  searchBar: {
    height: 40,
    margin: 12,
    padding: 10,
    flex: 1,
    fontSize: 18,
  },
  sidebar: {
    position: "absolute",
    top: 50,
    left: 0,
    width: 250,
    height: "100%",
    backgroundColor: "white",
    padding: 20,
    zIndex: 1,
  },
  sidebarText: {
    color: "black",
    fontSize: 18,
    marginVertical: 10,
  },
  overlay: {
    position: "absolute",
    top: 50,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 0,
  },
});

function padding(topBottom: number, leftRight: number) {
  return {
    paddingTop: topBottom,
    paddingRight: leftRight,
    paddingBottom: topBottom,
    paddingLeft: leftRight,
  };
}
