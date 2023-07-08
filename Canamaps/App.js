import { useState, useEffect } from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './screens/Profile';
import Friends from './screens/Friends';
import Settings from './screens/Settings';
import Login from './screens/Login';
import { AntDesign } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { getAuth } from "firebase/auth";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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

  const auth = getAuth();
  const user = auth.currentUser;

    if (user) {
     // User is signed in
        console.log(user.email + " is signed in")
    // ...
    } else {
    // No user is signed in. Go to login
        console.log("home - no user signed in")
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
    const navigation = useNavigation();

    return (
      <View style={styles.screen}>
        <MapView
          style={styles.map}
          region={region}
        >
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <AntDesign name="setting" size={24} color="black" />
          </TouchableOpacity>

          <Marker
            coordinate={pin}
            pinColor='red'
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

  function ClanScreen() {
    return (
      <View style={styles.screen}>
        <Text>Clan Screen</Text>
        {/* Your inbox screen content goes here */}
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Friends" component={Friends} />
        <Tab.Screen name="Account" options={{ headerShown: false }}>
          {() => (
            <Stack.Navigator>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Profile" component={Profile} options={{headerBackVisible: false}} />
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="Map" options={{ headerShown: false }}>
          {() => (
            <Stack.Navigator>
              <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen name="Feed" component={FeedScreen} />
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
  settingsButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
});
