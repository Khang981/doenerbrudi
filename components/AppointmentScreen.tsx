import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import React, { useState } from 'react';
import { FlatList, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useUserContext } from '../app/context';
import styles from '../constants/styles/AppointmentStyle';

const AppointmentScreen = ({ shop, onClose, onConfirm }) => {
    const {userId} = useUserContext();
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [availableFriends, setAvailableFriends] = useState([]); // Liste der nicht eingeladenen Freunde
    const [showFriendModal, setShowFriendModal] = useState(false); // Steuert, ob das Modal geöffnet ist
    const [friends, setFriends] = useState<{ id: number; nickname: string; status: string }[]>([]);
    console.log("Aktuelle UserID:", userId);

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
    if (Platform.OS === "android") {
        setShowPicker(false);
    }
    };

    const inviteFriends = async () => {
    console.log("Neue Freunde einladen");

    try {
        const {data} = await axios({
            method: 'post',
            url: 'http://10.204.161.62:3001/doenerbrudi/Friends',
            data: {
                userId: userId
            }
        });
        const friendsData = data.response;
        console.log("Friendsdata:", friendsData);

        if (!Array.isArray(friendsData)) {
            console.error("Fehler: Erwartetes Array, aber erhalten:", friendsData);
            return; // Falls kein Array, abbrechen
        };

        const filteredFriends = friendsData.filter(friend => !selectedFriends.some(invited => invited.userId === friend.userId));
        console.log("filteredFriends:", filteredFriends);
        setAvailableFriends(filteredFriends);
        setShowFriendModal(true);
    } catch (error) {
        console.error("fehler beim Abrufen der Freundesliste:", error)
    }
    };

    const inviteFriend = (friend) => {
        console.log(`Freund eingeladen: ${friend.nickname}`);

        setFriends((prevFriends) => {
            const isAlreadyInList = prevFriends.some((f) => f.id === friend.userId);

            if (isAlreadyInList) {
                return prevFriends.map((f) => 
                    f.id === friend.userId ? { ...f, status: "angefragt"} :f);
            } else {
                return [...prevFriends, { id: friend.userId, nickname: friend.nickname, status: "angefragt"}];
            }
        });
        
        setSelectedFriends([...selectedFriends, friend]); // Zum eingeladenen Freundes-Array hinzufügen
        setShowFriendModal(false); // Modal schließen
    };

    const handleConfirm = async () => {
        if (!userId) {
            console.error("Fehler: Kein eingeloggter Benutzer!");
            //Alert.alert("Fehler", "Du musst eingeloggt sein, um einen Termin zuerstellen");
            return;
        }
        if(!date) {
            console.error("Kein Datum ausgewählt");
            return;
        }
    
        const acceptedFriends = friends.filter(friend => friend.status !== "Nein");

        console.log("termin-Daten werden gesendet:", {date, acceptedFriends});

        const businessName = shop?.tags?.name;

        const street = shop?.tags?.["addr:street"] || "Straße unbekannt";
        const houseNumber = shop?.tags?.["addr:housenumber"] || "";
        const postcode = shop?.tags?.["addr:postcode"] || "PLZ unbekannt";
        const city = shop?.tags?.["addr:city"] || "Stadt unbekannt";
        const businessLocation = `${street} ${houseNumber}, ${postcode} ${city}`;

        console.log("Freunde id:", friends.filter(friend => friend.status !== "Nein").map(friend => friend.id))
        const invitedFriends = [
            userId, friends.filter(friend => friend.status !== "Nein").map(friend => friend.id),
        ];
        console.log("Invited Friends:", invitedFriends);
        try {
            const response = await axios({
                method: 'post',
                url: 'http://10.204.161.62:3001/doenerbrudi/postNewAppointment',
                data: {
                    invited: invitedFriends,
                    appointmentDate: date.toISOString(),
                    creatorId: userId, 
                    businessName: businessName,
                    businessLocation: businessLocation
            }
        });

            console.log("Termin erfolgreich gespeichert!", response.data);
            onClose();
        } catch (error) {
            console.error("fehler beim speichern des Termins:", error);
        }
        onConfirm(date, acceptedFriends);
    };

    const removeFriend = (friendId) => {
        setFriends((prevFriends) => prevFriends.filter((friend) => friend.id !== friendId));
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
        <DateTimePicker 
            value={date} 
            mode="datetime" 
            display={Platform.OS === "ios" ? "inline" : "calender"} 
            onChange={handleDateChange} />
      )}

      {/* Eingeladene Freunde */}
        <View style={styles.friendsHeader}>
            <Text style={styles.sectionTitle}>Eingeladene Freunde:</Text>
            <TouchableOpacity style={styles.inviteButton} onPress={inviteFriends}>
                <Text style={styles.inviteButtonText}>Freunde einladen</Text>
            </TouchableOpacity>
        </View>

    <SwipeListView
        data={friends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
                <View style={styles.friendItem}>
                    <Text style={styles.friendName}>{item.nickname}</Text>
                    {getStatusIcon(item.status)}
                </View>
        )}
        renderHiddenItem={({ item }) => (
            <View style={styles.hiddenContainer}>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeFriend(item.id)}
                >
                    <AntDesign name="closecircle" size={24} color="white" />
                </TouchableOpacity>
            </View>
        )}
        rightOpenValue={-80}
        disableRightSwipe={true}
        stopRightSwipe={-80}
    />

    <Modal
        animationType="slide"
        transparent={true}
        visible={showFriendModal}
        onRequestClose={() => setShowFriendModal(false)}
    >
        <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Freunde einladen</Text>

      {/* Liste der Freunde */}
        <FlatList
        data={availableFriends}
        keyExtractor={(item) => item.userId.toString()}
        renderItem={({ item }) => (
            <TouchableOpacity 
            style={styles.friendItem} 
            onPress={() => inviteFriend(item)}
            >
            <Text style={styles.friendName}>{item.nickname}</Text>
            <Text style={styles.friendUsername}>@{item.username}</Text>
            </TouchableOpacity>
            )}
        />

      {/* Schließen-Button */}
        <TouchableOpacity style={styles.closeButton} onPress={() => setShowFriendModal(false)}>
        <Text style={styles.closeButtonText}>Schließen</Text>
        </TouchableOpacity>
    </View>
    </View>
</Modal>

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
