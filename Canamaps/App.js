import { useState, useEffect } from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  const [pin, setPin] = useState({
    latitude: 37.78825,
    longitude: -122.4324
  });
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
      if (status !== 'granted') {
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

  function FriendsScreen() {
    return (
      <View style={styles.screen}>
        <Text>Friends Screen</Text>
        {/* Your friends screen content goes here */}
      </View>
    );
  }

  function FeedScreen() {
    return (
      <View style={styles.screen}>
        <Text>Feed Screen</Text>
        {/* Your feed screen content goes here */}
      </View>
    );
  }

  function MapScreen() {
    return (
      <View style={styles.screen}>
        <MapView
          style={styles.map}
          region={region}
        >
          <Marker
            coordinate={pin}
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
          <Circle center={pin} radius={1000} />
        </MapView>
      </View>
    );
  }

  function InboxScreen() {
    return (
      <View style={styles.screen}>
        <Text>Inbox Screen</Text>
        {/* Your inbox screen content goes here */}
      </View>
    );
  }

  function ClanScreen() {
    return (
      <View style={styles.screen}>
        <Text>Clan Screen</Text>
        {/* Your clan screen content goes here */}
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Friends" component={FriendsScreen} />
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Inbox" component={InboxScreen} />
        <Tab.Screen name="Clans" component={ClanScreen} />
      </Tab.Navigator>
    </NavigationContainer>
     );
      
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
