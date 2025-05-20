import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const fossilSites = [
  { lat: 49.0, lng: -107.0, name: 'Eastend, Saskatchewan' },
  { lat: 45.0466, lng: -102.0325, name: 'Faith, South Dakota' },
  { lat: 46.0, lng: -106.0, name: 'Hell Creek Formation' },
  { lat: 33.0, lng: -107.0, name: 'Elephant Butte Reservoir' },
  { lat: 36.5, lng: -104.5, name: 'Raton, New Mexico' },
  { lat: 46.0, lng: -103.5, name: 'Marmarth, North Dakota' },
];

const API_TOKEN = 'pk.eyJ1IjoiYWpheDgxNSIsImEiOiJjbWF3dzFzYXcwajc4MmxxNGJhZjZzdDk1In0.uQZbksofkE1cg0Z4AvRosQ'

const MapComponent = () => (
  <MapContainer 
  center={[45.0, -105.0]}
  zoom={5}
  minZoom={3} // Minimum zoom level (adjust as needed)
  maxZoom={18} // Maximum zoom level (adjust as needed)
  style={{ height: '500px', width: '100%' }}
  >
    <TileLayer
      url={`https://api.mapbox.com/styles/v1/ajax815/cmawv56uv012701sd5xooh30p/tiles/256/{z}/{x}/{y}@2x?access_token=${API_TOKEN}`}
      attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
      tileSize={512}
      zoomOffset={-1}
    />
    {fossilSites.map((site, idx) => (
      <Marker key={idx} position={[site.lat, site.lng]}>
        <Popup>{site.name}</Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default MapComponent;
