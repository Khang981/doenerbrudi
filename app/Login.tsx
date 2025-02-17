import React from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { useUserContext } from './context';

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
    <View>
      <TextInput placeholder="Benutzername" onChangeText={setUsername} value={username} />
      <TextInput placeholder="Passwort" onChangeText={setPassword} value={password} secureTextEntry />
      <Button title="Anmelden" onPress={handleLogin} />
    </View>
  );
}