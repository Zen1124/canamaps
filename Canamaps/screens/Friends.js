import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { app } from "../firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function Friends () {

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
      )
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
    

