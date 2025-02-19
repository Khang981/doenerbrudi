import { StyleSheet, Image, RefreshControl, ScrollView, Platform, FlatList, View, TouchableOpacity, Modal, ActivityIndicator, Alert } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useUserContext } from '../context';
import React, { useRef } from 'react';
import axios from 'axios';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedModal } from '@/components/ThemedModal';
import { AntDesign } from '@expo/vector-icons';
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const AddFriendsButton = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const timeoutRef = useRef(null);

  const handleSendFriendRequest = async (senderId, receiverId) => {
    
    try {
      const response = await axios({
        method: 'post',
        url: apiUrl + '/doenerbrudi/postFriendRequest',
        data: {
          senderId: senderId,
          receiverId: receiverId
        }
      });
      
      if (response.data.success) {
        Alert.alert('Erfolg', 'Deine Freundschaftsanfrage wurde gesendet.');
      } else {
        Alert.alert('Fehler', 'Ein Fehler ist aufgetreten. Bitte versuche es später noch einmal.');
      }
    } catch (error) {
      console.error("error", error);
      Alert.alert('Fehler', 'Ein Fehler ist aufgetreten. Bitte versuche es später noch einmal.');
    }
  }

  const handleSearchChange = (searchValue) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setData([]);
    setLoading(true);

    timeoutRef.current = setTimeout(async () => {
      console.log('test', searchValue);
      if(!!searchValue){
        try {
          const response = await axios({
            method: 'post',
            url: apiUrl + '/doenerbrudi/getFindUser',
            data: {
              search: searchValue
            }
          });
          setData(response.data.response);
        } catch (error) {
          console.error("Fehler beim Abrufen der Daten:", error);
        }
      }
      setLoading(false);
    }, 1000); //Verzögerung
  };

  return (
  <>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={() => setOpenModal(!openModal)}>
        <IconSymbol size={28} name="plus" color={'#fffff'}/>
      </TouchableOpacity>
    </View>
    
    <ThemedModal
      animationType="slide"
      visible={openModal}
      onRequestClose={() => setOpenModal(false)}
    >
      <View style={{marginTop: 40}}>
        <TouchableOpacity
            style={{
              position: 'absolute',
              top: 0,
              right: 15,
              zIndex: 10,
              backgroundColor: '#dedede',
              padding: 5,
              borderRadius: 30,
              elevation: 5,
              shadowColor: "#000",
            }}
            onPress={() => setOpenModal(false)}
        >
            <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <ThemedText style={styles.text}>Name oder Email:</ThemedText>
        <ThemedTextInput
          style={styles.input}
          placeholder="Suche"
          onChangeText={handleSearchChange}
          // value={search}
        />
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {data.length != 0 && data.map(e => (
          <>
            {/* <ThemedText>{e.nickname ?? e.username}</ThemedText>
            <ThemedText>{e.email}</ThemedText> */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <ThemedText style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">{e.nickname ?? e.username}#{e.id}</ThemedText>
                  <TouchableOpacity style={{
                    backgroundColor: '#dedede',
                    borderRadius: 30,
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 5, // Für Android-Schatten
                    shadowColor: '#000', // Für iOS-Schatten
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                  }} onPress={() => {handleSendFriendRequest("1","5")}}>
                    <IconSymbol size={14} name="person.crop.circle.badge.plus" color={'#fffff'}/>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.cardContent}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <ThemedText>{e.email}</ThemedText>
                </View>
              </View>
            </View>
          </>
        ))}
      </View>
    </ThemedModal>
  </>  
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

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: 'post',
        url: apiUrl + '/doenerbrudi/Friends',
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
      <AddFriendsButton/>
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
    backgroundColor: '#dedede',
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10, 
  },
  text: {
    // borderWidth: 1,
    // borderColor: '#ccc',
    padding: 10,
    // marginLeft: 10,
    marginRight: 10,
    // marginBottom: 10,
    borderRadius: 10, 
  },
  card: {
    backgroundColor: '#ff8380',
    borderRadius: 8,
    elevation: 5, // Für Android-Schatten
    margin: 16,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 16,
  },
});
