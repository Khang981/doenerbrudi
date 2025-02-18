import { StyleSheet, Image, RefreshControl, ScrollView, Platform, FlatList, View, TouchableOpacity } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useUserContext } from '../context';
import React from 'react';
import axios from 'axios';

const FloatingButton = () => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={() => { }}>
        {/* Icon oder Text hinzufügen */}
      </TouchableOpacity>
    </View>
  );
};


const UserListItem = ({ item }) => {
  return (
    <>
      <View style={styles.itemContainer}>
        {/* <Image source={{ uri: item.avatar }} style={styles.avatar} /> */}
        <IconSymbol size={28} name="person.fill" color={'#ff8380'} style={styles.avatar}/>
        <View style={styles.textContainer}>
          <ThemedText style={styles.name}>{item.nickname ?? item}#{item.userId}</ThemedText>
          <ThemedText style={styles.email}>{item.email}</ThemedText>
        </View>
      </View>
      <View style={styles.divider} /> 
    </>
  );
};

export default function Friends() {
  const { userId } = useUserContext();
  
  const [data, setData] = React.useState([]);  
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  console.log("ASDF", data);


  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: 'post',
        url: 'http://10.204.161.62:3001/doenerbrudi/Friends',
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
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <UserListItem item={item} />}
        keyExtractor={(item) => item.userId}
        style={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <FloatingButton/>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    paddingTop: 60,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25, // Für einen runden Avatar
    marginRight: 16,
    paddingTop: 15,
    paddingLeft: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#888', // Leicht abgedunkelte Farbe
  },
  divider: {
    height: 1, // Dicke des Trenners
    backgroundColor: '#ccc', // Farbe des Trenners (hellgrau)
    marginVertical: 16, // Abstand oberhalb und unterhalb des Trenners
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 140,
    right: 40,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Für Android-Schatten
    shadowColor: '#000', // Für iOS-Schatten
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
});
