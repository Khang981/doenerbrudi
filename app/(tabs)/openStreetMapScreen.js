import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from 'react';
import { Button, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import WebView from 'react-native-webview';
import { getCoordinates, getDonerShops } from '../../scripts/services/openStreetMapService';
import styles from '../../scripts/styles/mapStyles';

//export default 
function InteractiveMapScreen() {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [donerShops, setDonerShopsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [city, setCity] = useState('');
    const [region, setRegion] = useState({
        latitude: 52.5200, // default koordinaten von Berlin (erste Anzeige)
        longitude: 13.4050,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [searchResults, setSearchResults] = useState([]); // kann wahrscheinlich weg
    const [modalVisible, setModalVisible] = useState(false);

    const handleCitySearch = async () => {
        //damit etwas eingegeben wird und kein Leerstring weitergeleitet wird
        if (!city.trim()) {
            console.error('Bitte eine Stadt eingeben');
            return;
        }

        const coordinates = await getCoordinates(city);
        if (coordinates && coordinates.length > 0) {
          setSearchResults(coordinates);
            setModalVisible(true);
        } else {
            console.error('Koordinaten konnten nicht abgerufen werden');
        }
    };

    const handleLocationSelect = async (location) => {
        const { lat, lon } = location;
        setRegion({
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
        });        
        setSelectedLocation({latitude: lat, longitude: lon});
        setSearchResults([]);
        setModalVisible(false);

        const shops = await fetchDonerShops(lat, lon);
        setDonerShopsList(shops);
    };

    const filterUniqueStreets = (results) => {
        const seen = new Set();
        return results.filter(item => {
            const street = item.address?.road || item.address?.municipality || item.address?.suburb;
            if (seen.has(street)) {
                return false;
            } else {
                seen.add(street);
                return true;
            }
        });
    };

    const renderLocationItem = ({ item }) => {
        const {display_name, address } = item;

        const street = address?.road || address?.municipality || address?.suburb || 'Straße: Unbekannt'; // Straße könnte auch als "municipality" kommen
        const postcode = address?.postcode || 'PLZ: Unbekannt';
        const city = address?.city || 'Stadt: Unbekannt';
        const state = address?.state || 'Bundesland: Unbekannt';

        return (
            <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleLocationSelect(item)}
            >
                <Text style={styles.listItemText}>{street}</Text>
                <Text>{postcode}</Text>
                <Text>{city}</Text>
                <Text>{state}</Text>
            </TouchableOpacity>
        );
    };
    
    const fetchDonerShops = async (lat,lon) => {
        console.log('Coord:', lat, lon);
        const shops = await getDonerShops(lat,lon);
        //console.log('dönerläden:', shops); debug
        return shops;
    };
    
    const handleMapPress = async (event) => {
        const { latitude, longitude} = event.nativeEvent.coordinates;
        setSelectedLocation({ latitude,longitude});

        const address = await getCoordinates({ lat: latitude, lon: longitude});

        if (address) {
            console.log('Adresse:', address);
            fetchDonerShops(address);
        }
    };

    const mapUrl = `
    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <style>
                body, html, #map { height: 100%; margin: 0; padding: 0;}
            </style>
            <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
            <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        </head>
        <body>
            <div id="map"></div>
            <script>
                var map= L.map('map').setView([${region.latitude}, ${region.longitude}], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                zoom: 13;
                zoomControl: true;
                doubleClickZoom: true;

                ${selectedLocation ? `
                L.marker([${selectedLocation.latitude}, ${selectedLocation.longitude}])
                .addTo(map)
                .bindPopup("Ausgewählter Ort")
                .openPopup();
                ` : ''}

                ${donerShops.map((shop) => `
                L.marker([${shop.lat}, ${shop.lon}], {
                icon: L.icon({
                        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                    })
                })
                .addTo(map)
                .bindPopup("${shop.tags.name || 'Dönerladen'}")
                `).join('')}
            </script>
        </body>
    </html>
    `;

return (
     <GestureHandlerRootView style={{ flex: 1}}>
        <View style={{backgroundColor: 'white', flex: 1 }}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.searchIconContainer}>
                <AntDesign name="search1" style= {styles.searchIcon} />
            </TouchableOpacity>

        <Modal 
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={()=> setModalVisible(false)}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                <TextInput // Textinput für Ortseingabe
                    style={styles.input}
                    placeholder="Stadt oder Straße eingeben"
                    value={city}
                    onChangeText={setCity}
                />
                <Button title="Suchen" onPress={handleCitySearch} />

                <FlatList
                data={filterUniqueStreets(searchResults)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => renderLocationItem({item})}
                />

            </View>
        </View>
    </Modal>


    <WebView
        originWhitelist={['*']}
        source={{ html: mapUrl}}
        style={{ flex: 1 }}
    />
            <View style={styles.donerShopsFoundContainer}>
                <Text style={styles.donerShopsFoundText}> Dönerbuden gefunden: {donerShops.length}</Text>
            </View>
       </View>
       </GestureHandlerRootView>
    );
};

export default InteractiveMapScreen;

/** <MapView
provider={null}
style={styles.map}
region={region}
onPress={handleMapPress}
showsUserLocation
loadingEnabled
urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
customMapStyle={[
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    }
]}
>
    {selectedLocation && <Marker coordinate={selectedLocation} title="Ausgewähler Ort" />}


</MapView>
*/

  /**      {searchResults.length > 0 && (
            <FlatList
                data={searchResults}
                keyExtractor={(item) => item.place_id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleLocationSelect(item)}>
                        <View style={styles.searchResultItem}>
                            <Text>{item.display_name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        )} */

/**        <KeyboardAvoidingView style={styles.inputContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <TextInput
            style={styles.input}
            placeholder="Stadt eingeben"
            value={city}
            onChangeText={setCity}
            />
            <Button title="Suche" onPress={handleCitySearch} />
        </KeyboardAvoidingView> */