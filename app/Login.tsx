import React from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { useUserContext } from './context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';

export default function LoginScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();

  const { setUserId } = useUserContext();

  const handleLogin = async () => {
    try {
      const {data} = await axios({
        method: 'post',
        url: 'http://10.204.161.62:3001/doenerbrudi/getLogin',
        data: {
          username: username,
          password: password
        }
      });

      if (data.success == true && data.response.length != 0){
        await AsyncStorage.setItem('authToken', data.response[0].id.toString());
        setUserId(data.response[0].id);
        router.replace('(tabs)');
      } else {
        // Zeige eine Fehlermeldung an (z.B. vom Server)
        Alert.alert('Fehler', data.error.message || 'Falsche Anmeldedaten');
      }
    } catch (error) {
      console.error('Fehler bei der Anmeldung:', error);
      Alert.alert('Fehler', 'Ein Fehler ist aufgetreten. Bitte versuche es später noch einmal.'); // Allgemeine Fehlermeldung
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Was darf's sein, Chef?</ThemedText>
      <ThemedText style={styles.subtitle}>
        Bitte geben Sie ihre Anmeldedaten an
      </ThemedText>

      <View style={styles.inputContainer}>
        <ThemedText>Benutzer:</ThemedText>
        <ThemedTextInput
          style={styles.input}
          placeholder="Chef"
          onChangeText={setUsername}
          value={username}
        />
        <ThemedText>Passwort:</ThemedText>
        <ThemedTextInput
          style={styles.input}
          placeholder="Das Übliche"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <TouchableOpacity style={styles.forgotPassword}>
          <ThemedText>Password vergessen?</ThemedText>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton}>
        <ThemedText>Noch kein Account? Registrieren</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  guestButton: {
    backgroundColor: '#eee',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  registerButton: {
    alignItems: 'center',
  },
});
