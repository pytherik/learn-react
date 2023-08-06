import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./Map.module.css";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {useCities} from "../context/CityContext.jsx";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import {useGeolocation} from "../hooks/useGeolocation.js";
import Button from "./Button.jsx";
import {useUrlPosition} from "../hooks/useUrlPosition.js";
import Spinner from "./Spinner.jsx";

function Map() {
  const {cities} = useCities();

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition} = useGeolocation();

  const [mapPosition, setMapPosition] = useState([40, 0])
  const {lat, lng} = useUrlPosition();

  useEffect(() => {
    if(lat && lng)
      setMapPosition([lat, lng]);
  }, [lat, lng])

  useEffect(() => {
    if(geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition])


  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
      <Button type='position' onClick={getPosition}>
        {isLoadingPosition ? "Loading...": 'Use your position'}
      </Button>)}
      <MapContainer className={styles.map}
                    center={mapPosition}
                    zoom={6.5}
                    scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
        <Marker position={mapPosition}
                key={city.id}
                icon={new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [30, 46],
                  iconAnchor: [15, 46]}
                )}>
          <Popup>
           <span>{city.emoji}</span> <span>{city.cityName}</span>
          </Popup>
        </Marker>
        ))}
       <ChangeCenter position={mapPosition}/>
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({position}) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    }
  })
}
export default Map;