import { StyleSheet } from 'react-native';

const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  searchContainer: {
    position: 'absolute',
    top: 50,  
    zIndex: 10,  
    width: '80%',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
  },
});

export default mapStyles;
