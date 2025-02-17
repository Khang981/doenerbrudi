import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import styles from '../scripts/styles/AppointmentStyle';

const AppointmentScreen = ({ shop, onClose, onConfirm }) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [friends, setFriends] = useState([
    { id: 1, name: 'Max', status: 'Ja' },
    { id: 2, name: 'Anna', status: 'Nein' },
    { id: 3, name: 'Felix', status: 'Anderer Vorschlag' }
  ]);

  const getStatusIcon = (status) => {
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus === "ja") return <AntDesign name="checkcircle" size={24} color="green" />;
    if (normalizedStatus === "nein") return <AntDesign name="closecircle" size={24} color="red" />;
    return <AntDesign name="questioncircle" size={24} color="orange" />;
};
  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowPicker(false);
  };

  const inviteFriends = () => {
    console.log("Neue Freunde einladen");
  };

  const handleConfirm = () => {
    if(!date) {
        console.error("Kein Datum ausgewählt");
        return;
    }
    
    const acceptedFriends = friends.filter(friend => friend.status !== "Nein");

    console.log("termin-Daten werden gesendet:", {date, acceptedFriends});

    onConfirm(date, acceptedFriends);
  }
  return (
    <View style={styles.container}>

      {/* Laden-Details */}
      <Text style={styles.shopName}>{shop?.tags?.name || 'Unbekannter Laden'}</Text>
      <Text style={styles.shopAddress}>
        {shop?.tags?.["addr:street"] || 'Straße unbekannt'} {shop?.tags?.["addr:housenumber"] || ''},{' '}
        {shop?.tags?.["addr:postcode"] || ''} {shop?.tags?.["addr:city"] || 'Stadt unbekannt'}
      </Text>

      {/* Trennlinie */}
      <View style={styles.separator} />

      {/* Datum & Uhrzeit auswählen */}
      <Text style={styles.sectionTitle}>Datum auswählen:</Text>
      <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowPicker(true)}>
        <Text style={styles.dateText}>{date.toLocaleString()}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker value={date} mode="datetime" display="default" onChange={handleDateChange} />
      )}

      {/* Eingeladene Freunde */}
      <View style={styles.friendsHeader}>
        <Text style={styles.sectionTitle}>Eingeladene Freunde:</Text>
        <TouchableOpacity style={styles.inviteButton} onPress={inviteFriends}>
          <Text style={styles.inviteButtonText}>Freunde einladen</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={friends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Text style={styles.friendName}>{item.name}</Text>
            {getStatusIcon(item.status)}
          </View>
        )}
      />
     <TouchableOpacity
        style={styles.createAppointmentButton}
        onPress={handleConfirm}
    >
        <Text style={styles.createAppointmentButtonText}> Termin erstellen</Text>
    </TouchableOpacity>
      
    </View>
  );
};

export default AppointmentScreen;

/** import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { FlatList, Platform, Text, TouchableOpacity, View } from 'react-native';
import styles from '../scripts/styles/AppointmentStyle';

export function AppointmentScreen({shop, onClose}) {
    const [modalVisible, setModalVisible] = useState(false);
    //const { shop } = route.params || {};

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const createdBy = "Aktueller Benutzer";

    
    const invitedFriends = [
        { id: "1", name: "Max", accepted: "ja"},
        { id: "2", name: "Lisa", accepted: "nein"},
        { id: "3", name: "Paul", accepted: "anderer Vorschlag"},
    ];

    const onChange = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            setShowPicker(false);
        }
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const getStatusIcon = (status) => {
        if (status === "ja") return <AntDesign name="checkcircle" size={24} color="green" />;
        if (status === "nein") return <AntDesign name="closecircle" size={24} color="red" />;
        return <AntDesign name="questioncircle" size={24} color="orange" />;
    };

    if (!shop) {
        return  (
            <View style={styles.container}>
                <Text style={styles.title}>Neuen Termin erstellen</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('openStreetMapScreen')}
                    >
                        <Text style={styles.buttonText}>Auf der Karte auswählen</Text>
                    </TouchableOpacity>
            </View>
        )
    };
    console.log("Ausgewählter Shop:", route.params);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.shopTitle }>{shop.tags.name || 'Unbekannter Dönerladen'}</Text>
            <Text style={styles.address}>
                {shop.tags["addr:street"] || 'Straße unbekannt'} {shop.tags["addr:housenumber"] || ''},
                {shop.tags["addr:postcode"] || 'PLZ unbekannt'}, {shop.tags["addr:city"] || 'Stadt unbekannt'}
            </Text>
            <View style={styles.separator} />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Datum auswählen:</Text>
                <TouchableOpacity onPress={() => setShowPicker(!showPicker)} style={styles.dateButton}>
                    <Text>{date.toLocaleDateString("de-DE")}</Text>
                </TouchableOpacity>
                {showPicker && (
                    <DateTimePicker 
                        value={date} 
                        mode="date" 
                        display={Platform.OS === "ios" ? "spinner" : "default"} 
                        onChange={onChange} 
                    />
                )}
            </View>

            <View style={styles.section}>
                <View style={styles.inviteHeader}>
                <Text style={styles.sectionTitle}>Eingeladene Freunde:</Text>
                    <TouchableOpacity style={styles.inviteButton} onPress={() => console.log("neue Freunde einladen")}>
                        <Text style={styles.inviteButtonText}>Freunde einladen</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={invitedFriends}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.friendItem}>
                            <Text style={styles.friendName}>{item.name}</Text>
                            {getStatusIcon(item.accepted)}
                        </View>
                    )}
                    />
            </View>

            <TouchableOpacity style={styles.createButton} onPress={() => console.log("Termin gespeichert")}>
                <Text style={styles.createButtonText}>Termin erstellen</Text>
            </TouchableOpacity>
        </View>
    );
};

//export default AppointmentScreen; */
