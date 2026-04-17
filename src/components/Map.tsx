import { Platform } from "react-native"
import MapView, { Marker } from "react-native-maps"

type MapProps = {
  latitude: number
  longitude: number
}

export const Map = ({latitude, longitude}: MapProps) => {
    return  <MapView
    style={{height: '100%', width: '100%'}}
    initialRegion={{
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.0421,
    }}
    scrollEnabled={false}
    zoomEnabled={false}
    rotateEnabled={false}
    pitchEnabled={false}
    liteMode={Platform.OS === 'android'}
    pointerEvents="none"
  >
    <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
  </MapView>
}