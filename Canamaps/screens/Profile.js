import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { getAuth } from "firebase/auth";


export default function Profile ({navigation}) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
     // User is signed in
        
    // ...
    } else {
    // No user is signed in. Go to login
        console.log("no user signed in");
        navigation.navigate('Login')
    }

    return (
        <View style={styles.screen}>
            <Text>Username: {user.displayName}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Account Created: {user.createdDate}</Text>
            <Text>Followers: {user.followers}</Text>
            <Text>Following: {user.following}</Text>
            <Text>Times Smoked: {user.timesSmoked}</Text>
            <Button
                onPress={() => {navigation.navigate('Change Info')}}
                title='Change Account Info'
            />
        </View>

    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        borderRadius: 10,
        backgroundColor: 'green',
        width: '100%',
        marginTop: 8,
        padding: 10
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 800,
        color: 'white'
    },
    buttonOut: {
        borderRadius: 10,
        backgroundColor: 'white',
        width: '100%',
        marginTop: 8,
        padding: 10,
        borderColor: 'green'
    },
    buttonTextOut: {
        textAlign: 'center',
        fontWeight: 800,
        color: 'green'
    },
    errorMsg: {
        color: 'red'
    }
});