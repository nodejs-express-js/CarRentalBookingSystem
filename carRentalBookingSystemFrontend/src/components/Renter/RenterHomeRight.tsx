import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Styles from './RenterHomeRight.module.css';
import useCreateRenterLocation from '../../hooks/useCreateRenterLocation';
export interface CarRentalPost {
    name: string;
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
    carRentalPhoto: File|null;
  }
const RenterHomeRight = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 }); // State to hold the marker position
  const [isLocationAvailable, setIsLocationAvailable] = useState(false);

  const [center, setCenter] = useState({ lat: 0, lng: 0 }); // Initial center set to (0, 0)
  const [carRentalPost,setCarRentalPost] = useState<CarRentalPost>({
    name: '',
    city: '',
    state: '',
    country: '',
    latitude: 0,
    longitude: 0,
    carRentalPhoto: null
  })
  const {error,loading,createRenterLocationPost}=useCreateRenterLocation();
  // Get the user's current location when the component is mounted
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          setCenter({ lat: latitude, lng: longitude }); // Update map center with user's current location
          setMarkerPosition({ lat: latitude, lng: longitude }); // Set initial marker position to current location
          setIsLocationAvailable(true);
        },
        () => {
          alert("Location not available. Using default coordinates (0, 0).");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser. Using default coordinates (0, 0).");
    }
  }, []);

  const handleLatitudeChange = (e:React.ChangeEvent<HTMLInputElement>) => setLatitude(parseFloat(e.target.value));
  const handleLongitudeChange = (e:React.ChangeEvent<HTMLInputElement>) => setLongitude(parseFloat(e.target.value));

  const handleSubmit = () => {
    if(carRentalPost.name=="" || carRentalPost.city=="" || carRentalPost.state=="" || carRentalPost.country=="" || carRentalPost.carRentalPhoto==null){
        alert("Please fill all the fields")
        return;
    }
    // setCarRentalPost({...carRentalPost, latitude: latitude, longitude: longitude})
    createRenterLocationPost({...carRentalPost, latitude: latitude, longitude: longitude})
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          setCenter({ lat: latitude, lng: longitude });
          setMarkerPosition({ lat: latitude, lng: longitude });
        },
        () => {
          alert("Unable to retrieve current location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleMarkerDragEnd = (event:google.maps.MapMouseEvent) => {
    let newLat:number=0,newLng:number = 0;
    if(event.latLng)
        newLat= event.latLng.lat();
    if(event.latLng)
        newLng= event.latLng.lng();
    
    setMarkerPosition({ lat: newLat, lng: newLng });
    setLatitude(newLat);
    setLongitude(newLng);
  };

  const handleMapClick = (event:google.maps.MapMouseEvent) => {
    let lat:number=0,lng:number=0;
    if(event.latLng)
        lat = event.latLng.lat();
    if(event.latLng)
        lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
    setCenter({ lat, lng });
    setLatitude(lat);
    setLongitude(lng);
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const mapOptions = {
    zoom: 16,  // Adjust zoom level as needed
    center: center,
  };

  return (
    <div className={Styles.minicontainer2}>
      <h3>Your Current Location</h3>

      {!isLocationAvailable && <p>Loading your location...</p>}
      <div>
            <label>Name: </label>
            <input
              type="text"
              placeholder="Name"
              value={carRentalPost.name}
              onChange={(e) => setCarRentalPost({...carRentalPost, name: e.target.value })}/>
      </div>
      <div>
        <label>City: </label>
        <input
          type="text"
          placeholder="City"
          value={carRentalPost.city}
          onChange={(e) => setCarRentalPost({...carRentalPost, city: e.target.value })}/>
      </div>
      <div>
        <label>State: </label>
        <input
          type="text"
          placeholder="State"
          value={carRentalPost.state}
          onChange={(e) => setCarRentalPost({...carRentalPost, state: e.target.value })}/>
      </div>
      <div>
        <label>Country: </label>
        <input
          type="text"
          placeholder="Country"
          value={carRentalPost.country}
          onChange={(e) => setCarRentalPost({...carRentalPost, country: e.target.value })}/>
      </div>
      <div>
      <label>Latitude: </label>
        <input
          type="number"
          placeholder="Latitude"
          value={latitude}
          onChange={handleLatitudeChange}
        />
      </div>
      <div>
        <label>Longitude: </label>
        <input
          type="number"
          placeholder="Longitude"
          value={longitude}
          onChange={handleLongitudeChange}
        />
      </div>
      <div>
        <label>car rental photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>{ 
            if(e.target.files)
            setCarRentalPost({...carRentalPost, carRentalPhoto: e.target.files[0] })
        }}
        />
      </div>
      {error ? <div>{error}</div> : <></>}
      <button onClick={handleSubmit} disabled={loading}>Submit</button>

      <button onClick={handleCurrentLocation}>Use Current Location</button>

      <LoadScript googleMapsApiKey="AIzaSyBORBUrw1JVEKP7-RAb3Tkzdf3bNCDLnOw">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center} // Centering map dynamically based on `center` state
          zoom={16} // Zoom level
          options={mapOptions}
          onClick={handleMapClick} // Handle click event to place marker
        >
          {markerPosition && (
            <Marker
              position={markerPosition}
              draggable={true} // Make marker draggable
              onDragEnd={handleMarkerDragEnd} // Update position when marker is dragged
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default RenterHomeRight;
