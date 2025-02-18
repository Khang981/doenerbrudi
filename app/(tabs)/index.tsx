import Card from '@/components/Card';
import { ThemedText } from '@/components/ThemedText';
import {Button, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React from 'react';
import { useUserContext } from '../context';

export default function Dashboard() {
  // const apiUrl = process.env.REACT_APP_API_URL;
  const { userId } = useUserContext();

  const [data, setData] = React.useState([]);  
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const router = useRouter(); // Initialisiere den Router

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken'); // Entferne den authToken
      router.replace('/Login'); // Navigiere zum Login-Screen
    } catch (error) {
      console.error('error login:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: 'post',
        url: 'http://10.204.161.62:3001/doenerbrudi/getAppointment',
        data: {
          userId: userId
        }
      });
      setData(response.data.response);
    } catch (error) {
      setError(error);
      console.error("Fehler beim Abrufen der Daten:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  if (loading) {
    return <ThemedText>Daten werden geladen...</ThemedText>; 
  }

  if (error) {
    return <ThemedText>Fehler: {error?.message}</ThemedText>;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogout}>
          <Text style={styles.loginButton}>Abmelden</Text>
        </TouchableOpacity>
        <ThemedText>
            bevorstehende Termine
        </ThemedText>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
            <View>
                {data.map( e => (
                  <>
                    <Card key={e.id} data={e} />
                  </>
                ))}
            </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: '#ff8380',
    // borderRadius: 5,
    // padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
});