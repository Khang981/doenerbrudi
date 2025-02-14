import React from 'react';
import axios from 'axios';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Card from '@/components/Card';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';

export default function Dashboard() {
  // const apiUrl = process.env.REACT_APP_API_URL;
  
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    fetchData();
  }, []); 

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: 'post',
        url: 'http://10.204.161.196:3001/doenerbrudi/getAppointment',
        data: {
          userId: 1
        }
      });
      setData(response.data);
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

  data.map(e => {
    console.log("asdf",e);
  })
  

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
            <View>
                {data.map( e => (
                  <Card key={e.id} title={e.businessName} content={e.businessLocation} />
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
});