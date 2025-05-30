import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// const fossilSites = [
//   { lat: 49.0, lng: -107.0, name: 'Eastend, Saskatchewan (Scotty site)' },
//   { lat: 45.0466, lng: -102.0325, name: 'Faith, South Dakota (Sue site)' },
//   { lat: 49.6075, lng: -114.1069, name: 'Crownest Pass, Alberta (Coulee site)' },
//   { lat: 46.0, lng: -106.0, name: 'Hell Creek Formation' },
//   { lat: 33.0, lng: -107.0, name: 'Elephant Butte Reservoir' },
//   { lat: 36.5, lng: -104.5, name: 'Raton, New Mexico' },
//   { lat: 46.0, lng: -103.5, name: 'Marmarth, North Dakota' },
// ];

const API_STYLE = 'cmawz5373005e01qyhgnw55ks'
const API_TOKEN = 'pk.eyJ1IjoiYWpheDgxNSIsImEiOiJjbWF3dzFzYXcwajc4MmxxNGJhZjZzdDk1In0.uQZbksofkE1cg0Z4AvRosQ'

const MapComponent = ({ sites = [] }) => (
  <MapContainer 
  center={[40.0, 0.0]}
  zoom={1.3}
  minZoom={1.3} 
  maxZoom={3.5} 
  scrollWheelZoom={true} 
  style={{ height: '500px', width: '100%'}}
  options={{
    scrollWheelZoom: {
      speed: 0.5, 
    },
  }}
  maxBounds={[
    [85, -180], 
    [-85, 180], 
  ]}
  attributionControl={false}
  >
    <TileLayer
      url={`https://api.mapbox.com/styles/v1/ajax815/${API_STYLE}/tiles/256/{z}/{x}/{y}@2x?access_token=${API_TOKEN}`}
      attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
      tileSize={256}
      zoomOffset={0}
    />
    {/* {fossilSites.map((site, idx) => (
      <Marker key={idx} position={[site.lat, site.lng]}>
        <Popup>{site.name}</Popup>
      </Marker>
    ))} */}
     {sites.map((site, idx) => (
      <Marker key={idx} position={[site.lat, site.lng]}>
        <Popup>{site.name}</Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default MapComponent;
