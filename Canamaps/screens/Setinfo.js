import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";


export default function Login ({navigation}) {

    
    //const [password, setPassword] = useState('')
    //const [loginError, setLoginError] = useState('')
    const auth = getAuth();
    const user = auth.currentUser;
    const [email, setEmail] = useState(user.email)
    const [username, setUsername] = useState(user.displayName)
    
    const handleChanges = () => {
       updateProfile(user, {
        displayName: username
       })
           
    }

    const cancelChanges = () => {
       navigation.navigate('Profile');
    }

    return (
        <KeyboardAvoidingView 
            style={styles.screen}
            behavior='padding'
        >
            <View style={styles.inputContainer}>
                <Text>Username</Text>
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={text => setUsername(text)}
                    style ={styles.input}
                />
                <Text>Email</Text>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style ={styles.input}
                />
                <Text style={styles.errorMsg}>
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                onPress={handleChanges}
                style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={cancelChanges}
                style={styles.buttonOut}>
                    <Text style={styles.buttonTextOut}>Cancel</Text>
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