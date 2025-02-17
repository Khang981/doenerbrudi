import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 20,
      paddingTop: 60,
    },
    closeButton: {
      position: 'absolute',
      top: 40,
      right: 20,
    },
    shopName: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 5,
    },
    shopAddress: {
      fontSize: 16,
      textAlign: 'center',
      color: 'gray',
    },
    separator: {
      height: 1,
      backgroundColor: 'lightgray',
      marginVertical: 15,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    datePickerButton: {
      backgroundColor: '#f0f0f0',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 20,
    },
    dateText: {
      fontSize: 16,
    },
    friendsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    inviteButton: {
      backgroundColor: '#007bff',
      padding: 8,
      borderRadius: 5,
    },
    inviteButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    friendItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
    },
    friendName: {
      fontSize: 16,
    },
    friendStatus: {
      fontSize: 14,
      color: 'gray',
    },
    createButton: {
      backgroundColor: 'green',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    createButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    createAppointmentButton: {
      backgroundColor: 'green',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      margin: 20,
    },
    createAppointmentButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });