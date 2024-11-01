import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import Mapbox, {
  Camera,
  Images,
  LocationPuck,
  MapView,
  ShapeSource,
  SymbolLayer,
} from "@rnmapbox/maps";
import * as Location from "expo-location";
import { featureCollection, point } from "@turf/helpers";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const toiletPin = require("@/assets/images/toilet-pin.png");
const toiletsData = [
  {
    coordinates: [27.9197, 43.2156],
    toilet_rating: 8,
    price: 1.0,
  },
  {
    coordinates: [27.9134, 43.2049],
    toilet_rating: 6,
    price: 0.5,
  },
  {
    coordinates: [27.9242, 43.2171],
    toilet_rating: 9,
    price: 0.0,
  },
  {
    coordinates: [27.9179, 43.2103],
    toilet_rating: 5,
    price: 1.5,
  },
  {
    coordinates: [27.9275, 43.2145],
    toilet_rating: 7,
    price: 0.0,
  },
  {
    coordinates: [27.9223, 43.218],
    toilet_rating: 3,
    price: 0.3,
  },
  {
    coordinates: [27.919, 43.215],
    toilet_rating: 10,
    price: 2.0,
  },
  {
    coordinates: [27.9152, 43.2088],
    toilet_rating: 4,
    price: 0.2,
  },
  {
    coordinates: [27.9218, 43.2123],
    toilet_rating: 6,
    price: 0.0,
  },
  {
    coordinates: [27.9187, 43.2154],
    toilet_rating: 8,
    price: 0.5,
  },
];

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

  //load toilet pins
  const toiletPoints = toiletsData.map((d) => point(d.coordinates));

  return (
    <>
      <MapView style={styles.map}>
        <Camera
          ref={camera}
          zoomLevel={16}
          centerCoordinate={startCoordinate}
        />
        <LocationPuck
          puckBearingEnabled
          puckBearing="heading"
          pulsing={{ isEnabled: true }}
        />

        <ShapeSource id="toilets" shape={featureCollection(toiletPoints)}>
          <SymbolLayer
            id="toilet-icons"
            style={{
              iconImage: "pin",
            }}
          />
          <Images images={{ pin: toiletPin }} />
        </ShapeSource>
      </MapView>

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
