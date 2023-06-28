import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function Profile () {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                onPress={() => {

                }}
                style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => {

                }}
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
    }
});