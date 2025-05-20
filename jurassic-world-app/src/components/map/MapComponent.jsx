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

const API_STYLE = 'cmawz5373005e01qyhgnw55ks'
const API_TOKEN = 'pk.eyJ1IjoiYWpheDgxNSIsImEiOiJjbWF3dzFzYXcwajc4MmxxNGJhZjZzdDk1In0.uQZbksofkE1cg0Z4AvRosQ'

const MapComponent = () => (
  <MapContainer 
  center={[40.0, 0.0]}
  zoom={1}
  minZoom={1} // Minimum zoom level (adjust as needed)
  maxZoom={3.5} // Maximum zoom level (adjust as needed)
  scrollWheelZoom={true} // Enable scroll zoom
  style={{ height: '500px', width: '100%', borderRadius: '5px' }}
  options={{
    scrollWheelZoom: {
      speed: 0.5, // Adjust this value for scroll speed. Lower values will make scrolling slower
    },
  }}
  maxBounds={[
    [85, -180], // South-west corner
    [-85, 180], // North-east corner
  ]}
  >
    <TileLayer
      url={`https://api.mapbox.com/styles/v1/ajax815/${API_STYLE}/tiles/256/{z}/{x}/{y}@2x?access_token=${API_TOKEN}`}
      attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
      tileSize={256}
      zoomOffset={0}
    />
    {fossilSites.map((site, idx) => (
      <Marker key={idx} position={[site.lat, site.lng]}>
        <Popup>{site.name}</Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default MapComponent;
