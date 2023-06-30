import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { app } from "./firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


export default function Profile () {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')
    const auth = getAuth();

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user.email + " signed up.");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                if (errorCode == "auth/email-already-in-use") {
                    setLoginError("Email already in use. Please try again.")
                } else if (errorCode == "auth/invalid-email") {
                    setLoginError("Please use a valid email address")
                }
                console.log(errorMessage);
            });
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user.email + " signed in.");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode == "auth/wrong-password" || errorCode == "auth/user-not-found") {
                    setLoginError("Email or password is incorrect. Please try again.")
                }
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    return (
        <KeyboardAvoidingView 
            style={styles.screen}
            behavior='padding'
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style ={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                    style ={styles.input}
                />
                <Text style={styles.errorMsg}>
                {loginError}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                onPress={handleSignIn}
                style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={handleSignUp}
                style={styles.buttonOut}>
                    <Text style={styles.buttonTextOut}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            
        </KeyboardAvoidingView>

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