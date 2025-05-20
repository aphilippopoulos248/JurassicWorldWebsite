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

const MapComponent = () => (
  <MapContainer center={[45.0, -105.0]} zoom={5} style={{ height: '500px', width: '100%' }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {fossilSites.map((site, idx) => (
      <Marker key={idx} position={[site.lat, site.lng]}>
        <Popup>{site.name}</Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default MapComponent;
