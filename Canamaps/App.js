import React, { useState, useEffect } from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { StyleSheet, View, Text, Button } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [pin, setPin] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324
  })
  const [location, setLocation] = useState();
  const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
  });
  
  

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status != 'granted') {
        console.log("Please grant location permissions");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Location:");
      console.log(currentLocation);
      setPin({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude
      });
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      });
    };
    getPermissions();
  }, []);
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        showsMyLocationButton={true}
        followsUserLocation={true}
        region={region}
      >
        <Marker coordinate={pin}
          pinColor='blue'
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinate.latitude)
          }}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            })
          }}
        >
          
          <Callout>
            <Text>Smoked here</Text>
          </Callout>
        </Marker>
        <Circle center={pin}
          radius={1000}/>
      </MapView>
      <View
        style={{
            width: '30%',
            bottom: 100,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
        <Button 
        title="press me"
        color='purple'
        style={{width: 10, height: 50, backgroundColor: 'blue'}}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    zIndex: 0,
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
