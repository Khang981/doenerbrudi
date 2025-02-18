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
    modalBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)", // Dunkler Hintergrund
  },
  modalContainer: {
      width: "80%",
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      elevation: 5,
  },
  modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
  },
  friendItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
  },
  nickname: {
      fontSize: 16,
      fontWeight: "bold",
  },
  username: {
      fontSize: 14,
      color: "gray",
  },
  friendsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  inviteButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  inviteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  friendItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    alignItems: "center",
  },
  friendName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  friendUsername: {
    fontSize: 14,
    color: "gray",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
deleteButton: {
  backgroundColor: "transparent",
  width: 50,
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 10,
},
hiddenContainer: {
  flex: 1,
  alignItems: "flex-end",
  justifyContent: "center",
  backgroundColor: "transparent",
},

modalHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 16,
  borderBottomWidth: 1,
  borderBottomColor: "#ddd",
},
modalTitle: {
  fontSize: 18,
  fontWeight: "bold",
},
closeButtonFriends: {
  padding: 8, 
},
  });