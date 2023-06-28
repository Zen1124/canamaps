import { useState, useEffect } from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';


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
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('suggestions');
  
    const handleSearch = () => {
      // Implement search functionality based on searchQuery
      // Retrieve search results from the backend or filter existing friend list
      // Update the UI accordingly
    };
  
    const renderSuggestionsTab = () => (
      <View style={styles.tabContent}>
        <Text>Suggestions Screen</Text>
        {/* Suggestions screen content */}
      </View>
    );
  
    const renderFriendsTab = () => (
      <View style={styles.tabContent}>
        <Text>Friends Screen</Text>
        {/* Friends screen content */}
      </View>
    );
  
    const renderRequestsTab = () => (
      <View style={styles.tabContent}>
        <Text>Requests Screen</Text>
        {/* Requests screen content */}
      </View>
    );
  
    return (
      <View style={styles.screen}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search friends..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'suggestions' && styles.activeTab]}
            onPress={() => setActiveTab('suggestions')}
          >
            <Text>Suggestions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'friends' && styles.activeTab]}
            onPress={() => setActiveTab('friends')}
          >
            <Text>Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'requests' && styles.activeTab]}
            onPress={() => setActiveTab('requests')}
          >
            <Text>Requests</Text>
          </TouchableOpacity>
        </View>
        {activeTab === 'suggestions' && renderSuggestionsTab()}
        {activeTab === 'friends' && renderFriendsTab()}
        {activeTab === 'requests' && renderRequestsTab()}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    searchInput: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 12,
    },
    searchButton: {
      marginLeft: 16,
      padding: 8,
      borderRadius: 8,
      backgroundColor: 'blue',
    },
    searchButtonText: {
      color: 'white',
    },
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginBottom: 16,
    },
    tab: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    activeTab: {
      backgroundColor: 'blue',
    },
    tabContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

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

  function ProfileScreen() {
    const user = {
      username: "woodwizard76",
      createdDate: "June 27, 2023",
      followers: 1,
      following: 0,
      timesSmoked: 8
    };
  
    return (
      <View style={styles.screen}>
        <Text>Username: {user.username}</Text>
        <Text>Account Created: {user.createdDate}</Text>
        <Text>Followers: {user.followers}</Text>
        <Text>Following: {user.following}</Text>
        <Text>Times Smoked: {user.timesSmoked}</Text>
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
        <Tab.Screen name="Friends" component={FriendsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
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
});
