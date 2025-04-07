import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Navbar from "./Navbar";
import { useState, useEffect } from 'react';

const CustomerHome = () => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const mapContainerStyle = {
    width: '25vw',
    height: '25vh',
  };

  const center = {
    lat: 37.7749, // Default center (San Francisco)
    lng: -122.4194,
  };

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const initialPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMarkerPosition(initialPosition);
          setLatitude(initialPosition.lat);
          setLongitude(initialPosition.lng);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          // Handle geolocation error (e.g., display a message)
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Handle lack of geolocation support
    }
  }, []); // Run only once on component mount

  const handleMapClick = (event) => {
    const latLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkerPosition(latLng);
    setLatitude(latLng.lat());
    setLongitude(latLng.lng());
  };

  const handleMarkerDragEnd = (event) => {
    const latLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkerPosition(latLng);
    setLatitude(latLng.lat());
    setLongitude(latLng.lng());
  };

  return (
    <div>
      <Navbar></Navbar>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={markerPosition || center} // Center on marker or default
          zoom={16}
          options={mapOptions}
          onClick={handleMapClick}
        >
          {markerPosition && (
            <Marker
              position={markerPosition}
              draggable={true}
              onDragEnd={handleMarkerDragEnd}
            />
          )}
        </GoogleMap>
      </LoadScript>
      <div>
        <p>Marker Position: {markerPosition ? `Lat: ${markerPosition.lat}, Lng: ${markerPosition.lng}` : "No Marker Placed"}</p>
       
      </div>
    </div>
  );
};

export default CustomerHome;