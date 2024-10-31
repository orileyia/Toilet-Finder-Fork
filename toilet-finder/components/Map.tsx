import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import Mapbox from "@rnmapbox/maps";
import * as Location from "expo-location";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

Mapbox.setAccessToken(
  "pk.eyJ1IjoiaG9nb3RvIiwiYSI6ImNsM3B2ZWkyMjA2YXUzam1zcHZtazlpbXkifQ.O37qtLHrUTSjH91IveGMOg"
);

const startCoordinate = [27.910543, 43.204666]; //Varna

function Map() {
  const camera = useRef<Mapbox.Camera>(null);

  // Function to find and center on user location
  const snapToUser = async () => {
    // Request permissions
    //how to check if the app already has permissions
    let { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      return;
    }

    //got permission

    // Get current location
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    console.log([longitude, latitude]);

    camera.current?.setCamera({
      centerCoordinate: [longitude, latitude],
      zoomLevel: 15,
    });
  };

  useEffect(() => {
    Mapbox.setTelemetryEnabled(false);
  }, []);

  return (
    <>
      <Mapbox.MapView style={styles.map}>
        <Mapbox.Camera
          ref={camera}
          zoomLevel={12}
          centerCoordinate={startCoordinate}
        />
      </Mapbox.MapView>

      <TouchableOpacity style={styles.bottomLeftButton}>
        <FontAwesome5 name="toilet" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomRightButton} onPress={snapToUser}>
        <FontAwesome6 name="location-crosshairs" size={24} color="white" />
      </TouchableOpacity>
    </>
  );
}

export default Map;

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
