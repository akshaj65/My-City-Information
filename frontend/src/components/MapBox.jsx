import React, { useState } from 'react';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import marker from '../Images/marker.jpeg'

const MapBox = () => {
  const [data, setData] = useState([]);
  const [clickedItem, setClickedItem] = useState(null);
  const handleListItemClick = (item) => {
    setClickedItem(item);
    console.log(clickedItem);
  };
  const myIcon = new Icon({
    iconUrl: marker,
    iconSize: [32, 32],
  });
  const loadData = () => {
    // Load data from the source (API or database)
    // Update the 'data' state with the new data
    setData([
      { id: 12, lat: 51.8566, lng: -0.09, name: 'Paris' },
      { id: 13, lat: 51.5200, lng: -0.09, name: 'Berlin' },
    ]);
  };
  useEffect(() => {
    loadData();
  }, [])


  return (
    <>
      <MapContainer
        center={clickedItem ? [clickedItem.lat, clickedItem.lng] : [51.505, -0.09]}
        zoom={13}
        style={{ height: '500px', width: '100%', borderRadius: '12px', padding: '6px' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((item) => (
          <Marker key={item.id} position={[item.lat, item.lng]} icon={myIcon} eventHandlers={
            {
              click: () => {
                handleListItemClick(item)
              }
            }}>
            <Popup>{item.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default MapBox;