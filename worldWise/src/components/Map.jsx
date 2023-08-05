import {useEffect, useState} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";
import styles from "./Map.module.css";
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import {useCities} from "../context/CityContext.jsx";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

function Map() {
  const navigate = useNavigate();
  const {cities, currentCity} = useCities();

  const [mapPosition, setMapPosition] = useState([40, 0])

  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(() => {
    if(mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng])

  return (
    <div className={styles.mapContainer}>
      <MapContainer className={styles.map}
                    center={mapPosition}
                    zoom={6.5}
                    scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
        <Marker position={[city.position.lat, city.position.lng]}
                key={city.id} icon={new Icon({iconUrl: markerIconPng})}>
          <Popup>
           <span>{city.emoji}</span> <span>{city.cityName}</span>
          </Popup>
        </Marker>
        ))}
       <ChangeCenter position={mapPosition}/>
      </MapContainer>
    </div>
  );
}

function ChangeCenter({position}) {
  const map = useMap();
  map.setView(position);
  return null;
}

export default Map;