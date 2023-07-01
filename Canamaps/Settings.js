import { useState, useEffect } from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Friends from './Friends';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';



export default function Settings () {

    return (
        <View>
          <Text>Settings Screen</Text>
          {/* Add your settings screen content here */}
        </View>
      );
    
}



