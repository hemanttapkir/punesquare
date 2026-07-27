'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue in Next.js
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface MapProps {
  title: string;
  lat?: number;
  lng?: number;
  locationName: string;
}

export default function ProjectMap({ title, lat = 18.6298, lng = 73.7423, locationName }: MapProps) {
  return (
    <div style={{ height: '320px', width: '100%', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--line)', marginTop: '12px' }}>
      <MapContainer center={[lat, lng]} zoom={14} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={customIcon}>
          <Popup>
            <strong>{title}</strong><br />
            {locationName}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}