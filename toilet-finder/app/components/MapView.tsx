import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';

export function MapView() {
    MapLibreGL.setAccessToken(null);
    return (
        <MapLibreGL.MapView
            style={styles.map}
            logoEnabled={false}
            styleURL={"https://demotiles.maplibre.org/style.json"}
            rotateEnabled={true}
            pitchEnabled={true}
            attributionEnabled={false}>
            <MapLibreGL.Camera
                defaultSettings={{centerCoordinate: [2, 41.5], zoomLevel: 8}}
            />
        </MapLibreGL.MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        alignSelf: 'stretch',
    },
});
