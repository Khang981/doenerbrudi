import React, { useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { getCoordinates, getDonerShops } from '../../scripts/services/openStreetMapService';
import mapStyles from '../../scripts/styles/mapStyles';

export default function MapScreen() {
    const [donerShops, setDonerShopsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState(' ');

    const handleSearch = async (address) => {
        if (!address) {
            console.log('Bitte eine Adresse eingeben');
            return;
        }
        setLoading(true);
        const coordinates = await getCoordinates(address);
        if (coordinates) {
            const shops = await getDonerShops(address.lat, address.lon);
            setDonerShopsList(shops);
        }
        setLoading(false);
    };

    return (
        <View style={mapStyles.container}>
            <View style={mapStyles.searchContainer}>
            <Button
                title="Nach Dönerbuden suchen"
                onPress={() => handleSearch('Alexanderplatz,Berlin, Deutschland')}
            />
            </View>

            {loading ? (
                <Text style={mapStyles.loadingText}>Lädt...</Text>
            ) : donerShops && donerShops.length === 0 ? (
                <Text style={mapStyles.noResultsText}>Keine Dönerbuden gefunden</Text>
            ) : (
                <FlatList
                data={donerShops}
                keyExtractor={(item) => `${item.lat}-&{item.lon}`}
                renderItem={({ item }) => (
                    <View style={mapStyles.listItem}>
                        <Text>{item.tags.name || `Dönerbude bei ${item.lat}, ${item.lon}`}</Text>
                    </View>
                )}
                />
            )}
        </View>
    );
}