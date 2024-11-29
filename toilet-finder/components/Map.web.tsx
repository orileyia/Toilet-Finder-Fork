import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { Marker } from "mapbox-gl";
import * as Location from "expo-location";
import $ from "jquery";
import { featureCollection, point } from "@turf/helpers";

import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";

import {
  Coordinate,
  findClosestToilet,
  ToiletData,
  RawToiletData,
} from "@/scripts/utils";

const toiletPinPath = "../assets/images/toilet-pin.png";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaXZhdHIiLCJhIjoiY20zejEzamNxMDAxaTJqc2cxMjE2NG9tNiJ9.KKlxlVtitAqWQsZYMeB7FA";

const startCoordinate: Coordinate = [27.910543, 43.204666]; // Varna

export default function Map() {
  const [toilets, setToilets] = useState<ToiletData[]>();
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  //#region Load Toilets
  useEffect(() => {
    $.ajax({
      url: "http://localhost/Toilet%20Finder%20Server/api/get_toilets.php", //#region fix this link
      type: "POST",
      success: (data) => {
        const _toilets: ToiletData[] = JSON.parse(data).map(
          (d: RawToiletData) => {
            return {
              coordinates: [d.longitude as number, d.latitude as number],
              rating: d.rating as number,
              price: d.price as number,
            } as ToiletData;
          }
        );
        setToilets(_toilets);
      },
    });
  }, []);
  //#endregion

  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map>();

  //#region Create Map
  useEffect(() => {
    if (!mapContainer.current) throw new Error("Map container is not set");

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: startCoordinate,
      zoom: 11,
    });

    // Set the map loading state to true once map finishes loading
    mapRef.current.on("load", () => {
      setIsMapLoaded(true);
    });

    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, []);
  //#endregion

  //#region Add Markers to Map
  const addMarkersToMap = function () {
    if (!toilets || !isMapLoaded) return;
    if (!mapRef.current) throw new Error("Map is not set");

    //make features
    const toiletPoints = toilets.map((t, idx) =>
      point(t.coordinates, { idx: idx })
    );
    const toiletFeatures = featureCollection(toiletPoints);

    mapRef.current.loadImage(toiletPinPath, (error, image) => {
      if (error) throw error;
      if (!mapRef.current) throw new Error("Map is not set");

      if (!image) throw new Error("Toilet pin image failed to load");

      // Add the image to the map
      mapRef.current.addImage("toilet-pin", image);

      mapRef.current.addSource("markers", {
        type: "geojson",
        data: toiletFeatures,
      });

      // Add a layer to display the markers
      mapRef.current.addLayer({
        id: "toiletPins",
        type: "symbol",
        source: "markers",
        layout: {
          "icon-image": "toilet-pin",
          "icon-allow-overlap": true,
        },
      });

      // NOT FINISHED - When a toilet pin is clicked open the toilet's page
      mapRef.current.on("click", "toiletPins", (e) => {
        if (!mapRef.current) throw new Error("Map is not set");

        const features = mapRef.current.queryRenderedFeatures(e.point, {
          layers: ["toiletPins"],
        });

        if (features.length) {
          const feature = features[0]; // Get the clicked feature

          //get toilet info
          if (!feature.properties)
            throw new Error("Toilet pin properties not set");

          const toiletId = feature.properties.idx as number;

          if (!toilets) throw new Error("Toilets nopt set");

          console.log(toilets[toiletId]);

          //how do I make the ToiletScreen load with the selected toilet - context or dynamic route
          //router.push(`/ToiletScreen/${toiletId}`);
        }
      });
    });
  };

  useEffect(() => {
    addMarkersToMap();
  }, [isMapLoaded, toilets]);
  //#endregion

  //#region Show where user is
  /*
  const divEl = <div className="user-location-marker" />;
  new Marker().setLngLat(startCoordinate).addTo();
  */
  //#endregion

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

  const findToilet = async () => {
    let { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      return;
    }

    //  Get current location
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    if (!toilets) throw new Error("Toilets are not set");

    //get closest toilet
    const closestToilet = findClosestToilet([longitude, latitude], toilets);
    console.log(closestToilet);

    if (!mapRef.current) throw new Error("Map not set");

    mapRef.current.flyTo({
      center: closestToilet?.coordinates,
      zoom: 15,
      essential: true,
      duration: 1500,
    });
  };

  return (
    <>
      <div ref={mapContainer} style={styles.map} />
      <TouchableOpacity style={styles.bottomLeftButton} onPress={findToilet}>
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
