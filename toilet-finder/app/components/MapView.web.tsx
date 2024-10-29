import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { container } from "ansi-fragments";

export function MapView() {
  const insertScript = `
            <script type="module">
                import("https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.js").then(
                    () => {
                        var map = new maplibregl.Map({
                            container: 'map', // container ID
                            style: 'https://demotiles.maplibre.org/style.json', // style URL
                            center: [-74.0060, 40.7128], // starting position [lng, lat] (New York City)
                            zoom: 9, // starting zoom
                        });
                    }
                );
            </script>`;
  const elRef = useRef<HTMLDivElement>();
  useLayoutEffect(() => {
    // same as useEffect
    const range = document.createRange();
    range.selectNode(elRef.current);
    const documentFragment = range.createContextualFragment(insertScript);

    // Inject the markup, triggering a re-run!
    // elRef.current.innerHTML = '';
    elRef.current.append(documentFragment);

    // const script = document.createElement("script");
    // const scriptText = document.createTextNode("console.log(maplibregl);");
    // script.appendChild(scriptText);
    // elRef.current.append(script);
  }, []);
  return (
    <View style={styles.map} ref={elRef}>
      <View id="map" style={styles.map}></View>
      <link
        rel="stylesheet"
        href="https://unpkg.com/maplibre-gl@latest/dist/maplibre-gl.css"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    alignSelf: "stretch",
  },
});
