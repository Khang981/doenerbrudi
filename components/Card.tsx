import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const formatDate = (isoString) => {
  //console.log("Eingehendes Datum:", isoString);
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return "Ungültiges Datum";
  }

  const formattedDate = date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month:  "2-digit",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${formattedDate} | ${formattedTime}`;
};

const Card = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false);
  // console.log("Data: ", data);

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">{data.businessName}</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text ellipsizeMode="tail">{data.businessLocation} </Text>
              <Text>{formatDate(data.appointmentDate)}</Text>
            </View>
          </View>
        </View> 
      </TouchableOpacity>
      
      <Modal 
        animationType="slide"
        visible={modalVisible}
        transparent={false}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{data.businessName}</Text>

            {/* ZUsätzliche Details anzeigen*/}
            <View>
              <Text style={styles.modalDetail}>📍 Adresse: {data.businessLocation}</Text>
              <Text style={styles.modalDetail}>🕒 Datum: {formatDate(data.appointmentDate)}</Text>
              <Text style={styles.modalDetail}>👥 Eingeladene Freunde: {data.invited}</Text>
            </View>

            {/* Schließen-Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Schließen</Text>
            </TouchableOpacity>
          </View>
        </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalDetail: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Card;