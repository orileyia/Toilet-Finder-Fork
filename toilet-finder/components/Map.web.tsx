import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import * as Location from "expo-location";

const toiletPinPath = "@/assets/images/toilet-pin.png";
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

mapboxgl.accessToken =
  "pk.eyJ1IjoiaG9nb3RvIiwiYSI6ImNsM3B2ZWkyMjA2YXUzam1zcHZtazlpbXkifQ.O37qtLHrUTSjH91IveGMOg";

const startCoordinate: [number, number] = [27.910543, 43.204666]; // Varna

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map>();

  useEffect(() => {
    if (!mapContainer.current) throw new Error("Map container is not set");

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: startCoordinate,
      zoom: 11,
    });

    //load markers
    //marker el

    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, []);

  // function to find and center on user location
  const snapToUser = async () => {
    //  Request permissions
    // how to check if the app already has permissions
    let { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      return;
    }

    // got permission

    //  Get current location
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    if (!mapRef.current) {
      throw new Error("Map not loaded yet");
    }

    mapRef.current.flyTo({
      center: [longitude, latitude],
      zoom: 15,
      essential: true,
      duration: 1500,
    });
  };

  return (
    <>
      <div ref={mapContainer} style={styles.map} />
      <TouchableOpacity style={styles.bottomLeftButton}>
        <FontAwesome5 name="toilet" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomRightButton} onPress={snapToUser}>
        <FontAwesome6 name="location-crosshairs" size={24} color="white" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
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
});
