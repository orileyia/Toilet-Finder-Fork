import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Map() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        This is a placeholder. I am not completely sure but we may need to use a
        different library for the web (instead of @rnmapbox/maps we may need
        mapbox-gl)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
