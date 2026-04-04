import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

// Fix Leaflet default icon issue in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const createCustomIcon = (color: string) => {
  return L.divIcon({
    html: `<div style="background-color:${color};width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 0 4px rgba(0,0,0,0.5);"></div>`,
    className: '',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
};

const ICONS = {
  cafe: createCustomIcon('#D4845A'), // Amber/Orange
  bookstore: createCustomIcon('#7B2D26'), // Burgundy
  event: createCustomIcon('#2563EB') // Blue
};

const MOCK_PINS = [
  { id: '1', lat: 30.3753, lng: 69.3451, name: 'Writers Cafe', type: 'cafe', description: 'Great coffee and quiet corners.', users: { display_name: 'Faez' } },
  { id: '2', lat: 30.38, lng: 69.35, name: 'Old Town Books', type: 'bookstore', description: 'Used books and poetry readings.', users: { display_name: 'Sarah' } }
];

function LocationMarker({ onAddPin }: { onAddPin: (latlng: L.LatLng) => void }) {
  useMapEvents({
    click(e) {
      onAddPin(e.latlng);
    },
  });
  return null;
}

export function LiteraryMap() {
  const [pins, setPins] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    async function fetchPins() {
      if (!isSupabaseConfigured) {
        setPins(MOCK_PINS);
        return;
      }
      const { data } = await supabase.from('map_pins').select('*, users(display_name)');
      if (data) setPins(data);
    }
    fetchPins();
  }, []);

  const handleAddPin = async (latlng: L.LatLng) => {
    if (!isAdding) return;
    
    const name = prompt("Location Name:");
    if (!name) { setIsAdding(false); return; }
    const type = prompt("Type (cafe, bookstore, event):", "cafe");
    const desc = prompt("Description:");

    if (!isSupabaseConfigured) {
      alert("Supabase not connected. Pin would be saved here.");
      setIsAdding(false);
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("You must be logged in to add a pin.");
        return;
      }

      await supabase.from('map_pins').insert([{
        user_id: user.id,
        name,
        type: type || 'cafe',
        lat: latlng.lat,
        lng: latlng.lng,
        description: desc
      }]);
      
      // Refresh pins
      const { data } = await supabase.from('map_pins').select('*, users(display_name)');
      if (data) setPins(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-playfair font-bold text-text">Literary Map</h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`px-4 py-2 rounded font-medium transition-colors ${isAdding ? 'bg-red-500 text-white' : 'bg-accent text-white'}`}
        >
          {isAdding ? 'Cancel' : '+ Add Pin'}
        </button>
      </div>
      
      {isAdding && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded border border-blue-200 text-sm">
          Click anywhere on the map to place your pin.
        </div>
      )}

      <div className="flex-1 rounded-xl border border-border overflow-hidden z-0 relative">
        <MapContainer 
          center={[30.3753, 69.3451]} 
          zoom={5} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {pins.map(pin => (
            <Marker 
              key={pin.id} 
              position={[pin.lat, pin.lng]}
              icon={ICONS[pin.type as keyof typeof ICONS] || ICONS.cafe}
            >
              <Popup>
                <div className="font-inter">
                  <strong className="font-playfair text-lg text-accent">{pin.name}</strong><br/>
                  <span className="text-xs uppercase opacity-70 text-text">{pin.type}</span><br/>
                  <p className="mt-1 text-sm text-text">{pin.description}</p>
                  <small className="opacity-50 text-text mt-2 block">Added by {pin.users?.display_name || 'Anonymous'}</small>
                </div>
              </Popup>
            </Marker>
          ))}
          <LocationMarker onAddPin={handleAddPin} />
        </MapContainer>
      </div>
    </div>
  );
}
