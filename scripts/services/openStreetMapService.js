// src/services/openStreetMapService.js

import axios from 'axios';

// Funktion für die Geocodierung (Adresse zu Koordinaten)
export const getCoordinates = async (address) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: address,
        format: 'json',
        addressdetails: 1,
      },
      headers: {
        'User-Agent':'doenerbrudi/1.0 (d0401742@gmail.com)'
      }
    });
    if (response.data && response.data[0]) {
      const { lat, lon } = response.data[0];
      return { lat, lon };
    }
    throw new Error('Koordinaten nicht gefunden');
  } catch (error) {
    console.error('Fehler bei der Geocodierung:', error);
    return null;
  }
};

// Funktion für die Suche nach Dönerbuden
export const getDonerShops = async (address) => {
    const coordinates = await getCoordinates(address);

    if (!coordinates) {
        console.error('Koordinante konnten nicht abgerufen werden');
        return[];
    }
//`https://nominatim.openstreetmap.org/search`
    const { lat, lon } = coordinates;
    try {
        const query = `[out:json];node["amenity"="fast_food"]["cuisine"="kebab"](around:2000,${address.lat},${address.lon});out body;`
        const encodedQuery  = encodeURIComponent(query);
        const response = await axios.get(`https://overpass-api.de/api/interpreter`, {
            params: {
                data: encodedQuery,
            },
        });
        console.log('Antowrt der API:', response.data);

        return response.data.elements || [];
    } catch (error) {
        console.error('Fehler bei der Anfrage:', error);
        throw error;
    }
};
