import React from 'react';
import { Text, View, Modal } from 'react-native';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';

const MyMapView = ({ latitude, longitude,address }) => {
    return (
        <MapView style={styles.map} initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.5,
            longitudeDelta: 0.05,
          }}
            provider="google"
          >
            <Marker
              draggable={true}
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
              pinColor='black'
            >
              {/* <Callout>
                <Text>{address}</Text>
              </Callout> */}
            </Marker>
            <Circle center={{ latitude: latitude, longitude: longitude, }} radius={1000} />
          </MapView>
    )
}

export default MyMapView;