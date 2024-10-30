import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Mapbox, { UserTrackingMode } from "@rnmapbox/maps";
import * as Location from "expo-location";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

Mapbox.setAccessToken(
  "pk.eyJ1IjoiaG9nb3RvIiwiYSI6ImNsM3B2ZWkyMjA2YXUzam1zcHZtazlpbXkifQ.O37qtLHrUTSjH91IveGMOg"
);

Mapbox.setConnected(true);

function Index() {
  // Function to find and center on user location
  const centerOnUserLocation = async () => {
    // Request permissions
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    // Get current location
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    console.log([longitude, latitude]);

    // Update state with new location
    camera.current?.setCamera({
      centerCoordinate: [29.910543, 43.204666],
      zoomLevel: 15,
      //set to follow user ?
    });
  };

  const camera = useRef<Mapbox.Camera>(null);

  useEffect(() => {
    //Mapbox.setTelemetryEnabled(false);
  }, []);

  return (
    <>
      <Mapbox.MapView style={styles.map}>
        <Mapbox.Camera
          ref={camera}
          zoomLevel={15}
          centerCoordinate={[27.910543, 43.204666]}
          followUserLocation={true}
          followUserMode={UserTrackingMode.Follow}
          followZoomLevel={17}
        />
      </Mapbox.MapView>

      <TouchableOpacity style={styles.bottomLeftButton}>
        <FontAwesome5 name="toilet" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomRightButton}
        onPress={centerOnUserLocation}
      >
        <FontAwesome6 name="location-crosshairs" size={24} color="white" />
      </TouchableOpacity>
    </>
  );
}

export default Index;

const styles = StyleSheet.create({
  bottomLeftButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#00A2FF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  bottomRightButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#00A2FF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  map: {
    flex: 1,
  },
});
