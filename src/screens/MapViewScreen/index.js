import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, StyleSheet,TouchableOpacity } from 'react-native';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
const { width, height } = Dimensions.get("screen");

const MapViewScreen = ({ route,navigation }) => {  
//   const {ui} =route.params;
  const [region, setRegion] = useState({
    latitude: 6.927079,
    longitude: 79.861244,
    address:'',
    latitudeDelta: 0,
    longitudeDelta: 0.05,
  })

  return (
    <View style={styles.container}>
         
      <MapView style={styles.map} initialRegion={{
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      }}
        provider="google"
      >
        <Marker
          draggable={true}
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          pinColor='black'
          // onDragStart={(e) => {
          //   console.log("Drag start ", e.notiveEvent.coordinates)
          // }}
          // onDragEnd={(e) => {
          //   console.log("Drag end ", e.notiveEvent.coordinates)
          //   setRegion({
          //     latitude: e.nativeEvent.coordinates.latitude,
          //     longitude: e.nativeEvent.coordinates.longitude
          //   })
          // }}
        >
          <Callout>
            <Text>I'm here</Text>
          </Callout>
        </Marker>
        <Circle center={{ latitude: region.latitude, longitude: region.longitude, }} radius={1000} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({  
  container: {
    flex: 1
  },
  map: {
    width: width,
    height: height,
  }
})

export default MapViewScreen;