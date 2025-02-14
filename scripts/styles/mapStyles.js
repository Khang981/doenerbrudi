import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    position: 'absolute',
    top: 50, 
    left: 20,
    right: 20,
    zIndex: 1, 
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  bottomText: {
    fontSize: 16,
    color: 'black',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Halbtransparenter Hintergrund
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    maxHeight: '50%', // Die Höhe des Modals auf 50% des Bildschirms begrenzen
    borderRadius: 10,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listItemText: {
    fontSize: 16,
  },
  searchIcon: {
    fontSize: 30,
    color: '#000',
  },
  searchIconContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  donerShopsFoundContainer: {
    padding: 10, 
    alignItems: 'center',
    zIndex: 1,
  },
  donerShopsFoundText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    zIndex: 1,
  },
  mapstyle: {
    flex: 1,
  },
});

export default styles;

