import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Navbar from "./Navbar";
import { useState, useEffect } from 'react';
import useCustomerFetchHomeLocations from '../../hooks/customer/useCustomerFetchHomeLocations';
import styles from './CustomerHome.module.css'; // Import the CSS module
import { useNavigate } from 'react-router-dom';

interface CarRentalLocation {
  id: number;
  name: string;
  city: string;
  carRentalPhoto: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  distancesquared: number;
  distance: number;
}
const CustomerHome = () => {
  const [markerPosition, setMarkerPosition] = useState({
    lat: 37.7749, // Default center (San Francisco)
    lng: -122.4194,
  });
  // const [latitude, setLatitude] = useState(0);
  // const [longitude, setLongitude] = useState(0);
  const {error,loading,RefreshHomeLocations}=useCustomerFetchHomeLocations();
  const [nearbyLocations,setNearbyLocations]=useState<CarRentalLocation[]>([]);
  const navigate=useNavigate();
  useEffect(()=>{
    const update=async()=>{
      if(!loading){
        setNearbyLocations(await RefreshHomeLocations(markerPosition.lat,markerPosition.lng))
      }
    }
    update()
  },[markerPosition.lat,markerPosition.lng])
  const showLocations=()=>{
    return nearbyLocations.map((location)=>{

      if (!location) {
        return <div className={styles.loading}>Loading car rental details...</div>;
      }

      return (
        <div className={styles.miniminicontainer} key={location.id} onClick={()=>{
          navigate(`/customereachlocation/${location.id}`)
        }}>
          <h2 className={styles.title}>{location.name} </h2>       
              <img
                src={location.carRentalPhoto}
                alt={`${location.name} in ${location.city}`}
                className={styles.photo}
              />
            <div className={styles.info}>
              <div>
                  <div className={styles.infoItem}>
                    <strong className={styles.label}>Name:</strong> {location.name}
                  </div>
                  <div className={styles.infoItem}>
                    <strong className={styles.label}>City:</strong> {location.city}
                  </div>
                  <div className={styles.infoItem}>
                    <strong className={styles.label}>State:</strong> {location.state}
                  </div>
                  <div className={styles.infoItem}>
                    <strong className={styles.label}>Country:</strong> {location.country}
                  </div>
              </div>
             
              

              <div >
                <div className={styles.infoItem}>
                      <strong className={styles.label}>Latitude:</strong> {location.latitude}
                    </div>
                    <div className={styles.infoItem}>
                      <strong className={styles.label}>Longitude:</strong> {location.longitude}
                    </div>
                    <div className={styles.infoItem}>
                      <strong className={styles.label}>Distance:</strong>{' '}
                      {location.distance.toFixed(2)}
                </div>
            </div>
          </div>
         
        </div>
      );
    })
  }
  const mapContainerStyle = {
    width: '30vw',
    height: '45vh',
  };

  const center = {
    lat: 37.7749, // Default center (San Francisco)
    lng: -122.4194,
  };

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMarkerPosition(currentLocation);
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
  };

  useEffect(() => {
    getCurrentLocation(); // Get initial location on component mount
  }, []); // Run only once on component mount

  const handleMapClick = (event:google.maps.MapMouseEvent) => {
    let latLng={
      lat:0,lng:0
    }
    if(event.latLng)
    latLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkerPosition(latLng);

  };

  const handleMarkerDragEnd = (event:google.maps.MapMouseEvent) => {
    let latLng={
      lat:0,lng:0
    }
    if(event.latLng)
    latLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkerPosition(latLng);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div  className={styles.container}>
              <div className={styles.minicontainer1}>
                
                  <div className={styles.error}>{error}</div>
                  <h1 className={styles.header}>Closest Car Rentals to you</h1>
                  <>{showLocations()}</>
              </div>
              <div className={styles.minicontainer2}>
                <h2 className={styles.header1}>Find Near By car Rentals setting your GPS</h2>
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
                    <button onClick={getCurrentLocation} className={styles.gpsbutton}>Current GPS Location</button>
                    <p className={styles.latlong}>{markerPosition ? `Lat: ${markerPosition.lat}, Lng: ${markerPosition.lng}` : "No Marker Placed"}</p>
              </div>
      </div>
     

    </div>
  );
};

export default CustomerHome;