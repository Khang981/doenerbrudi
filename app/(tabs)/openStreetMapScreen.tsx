import AppointmentScreen from '@/components/AppointmentScreen';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import WebView from 'react-native-webview';
import { getCoordinates, getDonerShops } from '../../scripts/services/openStreetMapService';
import styles from '../../constants/styles/mapStyles';

//export default 
function InteractiveMapScreen() {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [donerShops, setDonerShopsList] = useState([]);
    //const [loading, setLoading] = useState(false);))
    const [city, setCity] = useState('');
    const [region, setRegion] = useState(null);
    const [searchResults, setSearchResults] = useState([]); // kann wahrscheinlich weg
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedShop, setSelectedShop] = useState(null);
    const [appointments, setAppointments] = useState([]);

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

    // für neu rendering der Map bei neuer Suche
    const [webViewKey, setWebViewKey] = useState(0);
    const [mapUrl, setMapUrl] = useState('');

    const handleLocationSelect = async (location) => {
        const { lat, lon } = location;
        //@ts-ignore
        setRegion({
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });

        setSelectedLocation({latitude: lat, longitude: lon});
        //setSearchResults([]);
        setModalVisible(false);

        try {
            const shops = await fetchDonerShops(lat, lon);
            setDonerShopsList(shops);

            //updateMap(lat, lon, shops);
            //setWebViewKey(prevKey => prevKey +1);
        } catch (error) {
            console.error("Fehler beim Abrufen der Döönerläden", error);
        }
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

    useEffect(() => {
        const getLocation = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Berechtigung für Standort verweigert');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude} = location.coords;

            console.log("Smartphone-Standort:", latitude, longitude);

            setRegion({
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });

            setSelectedLocation({ latitude, longitude });

            const shops = await fetchDonerShops(latitude, longitude);
            setDonerShopsList(shops);

            updateMap(latitude, longitude, shops);
          setWebViewKey(prevKey => prevKey + 1);
        };
        getLocation();
    }, []);

    useEffect(() => {
        if (selectedLocation && donerShops.length > 0) {
            setTimeout(() => {
                console.log("Map wird aktualisiert...");
                updateMap(selectedLocation.latitude, selectedLocation.longitude, donerShops);
                setWebViewKey(prevKey => prevKey + 1);
            }, 500);
        }
    }, [selectedLocation, donerShops]);
    
    const fetchDonerShops = async (lat,lon) => {
        console.log('Coord:', lat, lon);
        const shops = await getDonerShops(lat,lon);
        //console.log('dönerläden:', shops); debug
        
        if (!shops || shops.length == 0) {
            console.warn('Keine Dönerläden gefunden.');
        } else {
            console.log('Dönerläden erhalten:', JSON.stringify(shops,null,2));
        }
        return shops;
    };

    const [appointmentModalVisible, setAppointmentModalVisible] = useState(false);
    const [selectedShopForAppointment, setSelectedShopForAppointment] = useState(null);

    const handleCreateAppointment = (shop) => {
        if (!shop) {
            console.error("Kein Dönerladen ausgewählt");
            return;
        }
        console.log('Termin erstellen für:', shop.tags?.name || 'Unbekannter Dönerladen');

        console.log('Daten vom Shop', shop);
        setSelectedShopForAppointment(shop);
        setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);

        console.log("Termin gespeichert:", newAppointment);

        setAppointmentModalVisible(true);

    };

    const handleSaveAppointment = (selectedDate, selectedFriends) => {
        if (!selectedShopForAppointment) {
            console.error("Kein Dönerladen asugewählt");
            return;
        }

        const newAppointment = {
            id: Math.random().toString(36).substr(2,9),
            shopName: selectedShopForAppointment.tags?.name,
            address: selectedShopForAppointment.tags?.["addr:street"],
            date: selectedDate.toISOString(),
            friends: selectedFriends || [],
        };
        
        setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);

        console.log("Termin gespeichert:", newAppointment);

        setAppointmentModalVisible(false);
    }



    const handleWebViewMessage = (event) => {
      try {
        const data = JSON.parse(event.nativeEvent.data);
        //console.log("Nachricht von WebView erhalten:",data);
        
        const shopData = data.shop?.shop || data.shop;

        setSelectedShopForAppointment(shopData);
        setAppointmentModalVisible(true);
        //handleCreateAppointment(shopData);
      } catch (error) {
        console.error("Fehler beim Parsen der Shop-Daten:",  error);
      }
    };

const updateMap = (lat, lon, shops) => {
   // if (!lat || !lon) return;

    const newMapUrl = `
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
                var map= L.map('map').setView([${lat}, ${lon}], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                ${shops.map((shop, index) => `
                var marker${index} = L.marker([${shop.lat}, ${shop.lon}]).addTo(map);

                var popupContent${index} = \`
                    <div style="text-align: center; font-family: Arial;">
                        <strong>${shop.tags?.name || 'Dönerläden'}</strong><br/>
                        ${shop.tags?.["addr:street"]|| 'Adresse unbekannt'}
                        ${shop.tags?.["addr:housenumber"]} <br/>
                        ${shop.tags?.["addr:postcode"] || ''}<br/>
                        ${shop.tags?.["addr:city"] || 'Unbekannt'}<br/>
                        <button onclick='window.ReactNativeWebView.postMessage(
                        JSON.stringify({
                        action: "createAppointment", 
                        shop: ${JSON.stringify(shop)} 
                        })
                        )'
                        style="background: #ffcc00; border: none; padding: 5px 10px; cursor: pointer; border-radius: 5px;">
                            Termin erstellen
                            </button>
                            </>
                        \`;
                        marker${index}.bindPopup(popupContent${index});
                        `).join('')}
            </script>
        </body>
    </html>
    `;

    setWebViewKey(prevKey => prevKey +1);
    setMapUrl(newMapUrl);
    //console.log("Map HTML: ", newMapUrl);
};

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
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>

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
        key={webViewKey}
        originWhitelist={['*']}
        source={{ html: mapUrl}}
        style={{ flex: 1 }}
        onMessage={handleWebViewMessage}
        onError={(error) => console.error("WebView Fehler:", error)}
    />

    <Modal
        animationType="slide"
        transparent={false}
        visible={appointmentModalVisible}
        onRequestClose={() => setAppointmentModalVisible(false)}
        >
            <View style={styles.fullscreenModal}>
                <TouchableOpacity
                style={styles.closeAppointmentButton}
                onPress={() => setAppointmentModalVisible(false)}
                >
                    <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>

                    {/* Übergeben von Ausgewählten Shop Daten um Termin zuerstellen*/}
                    <AppointmentScreen 
                        shop={selectedShopForAppointment} 
                        onClose={() => setAppointmentModalVisible(false)} 
                        onConfirm={(date, friends) => handleSaveAppointment(date, friends)}/>

            </View>

        </Modal>
    
    
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

/** 
    
    const handleMapPress = async (event) => {
        const { latitude, longitude} = event.nativeEvent.coordinates;
        setSelectedLocation({ latitude,longitude});

        const address = await getCoordinates({ lat: latitude, lon: longitude});

        if (address) {

            const shops = await fetchDonerShops(latitude, longitude);
            if (shops.length > 0) {
                setSelectedShop(shops[0]);
            }
           // console.log('Adresse:', address);
            //fetchDonerShops(address);
        }
    }; */