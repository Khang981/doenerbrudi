// src/services/openStreetMapService.js

// Funktion für die Geocodierung (Adresse zu Koordinaten)
export const getCoordinates = async (city) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&addressdetails=1&limit=10&countrycodes=DE`
    );
    const data = await response.json();
    // debugging
    //console.log("Antwort von der Nominatim API: ", data);

    if (data && data.length > 0) {
      return data;
    } else {
      console.error(' Kein Ergebnis du lusche');
      return [];
    }
  } catch (error) {
    console.error('Fehler bei der Geocodierung:', error);
    return null;
  }
};

// Funktion für die Suche nach Dönerbuden
export const getDonerShops = async (latitude, longitude) => {
    //const coordinates = await getCoordinates(address);

    if (!latitude || !longitude) {
        console.error('Koordinante konnten nicht abgerufen werden');
        return[];
    }

    //const { lat, lon } = coordinates;

    const query = `[out:json];node["amenity"="fast_food"]["cuisine"="kebab"](around:2000,${latitude},${longitude});out body;`
    const encodedQuery  = encodeURIComponent(query);
    console.log('Query:', encodedQuery);
    try {
        const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodedQuery}`);//, {
     //     params: { data: encodedQuery}
    //});

      const data = await response.json();
        //debugging
        //console.log('Antwort der API:', data);

        if (data && data.elements) {
          return data.elements;
        } else {
          console.error('Keine Elemente gefunden oder Antwort ist ungültig');
          return [];
        }
    } catch (error) {
        console.error('Fehler bei der Anfrage:', error);
        return [];
    };
};

export const getAddressFromCoordinates = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
    
    const data = await response.json();

    if (data.address) {
      return{
        street: data.address.road || "Straße unbekannt",
        city: data.address.city || data.address.town || data.address.village || "Stadt unbekannt",
        postcode: data.address.postcode || "PLZ unbekannt",
        };
      } else {
        return { street: "Unbekannt", city: "unbekannt", postcode: "unbekannt"};
      }
  } catch (error) {
      console.error("Fehler beim Reverse-Geocoding:", error);
      return { street: "fehler", city: "fehler", postcode: "Fehler"};
    }
};

