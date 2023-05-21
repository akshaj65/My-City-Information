  import React, { useRef, useState, useEffect } from 'react';
  import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
  import debounce from 'lodash.debounce';
  import { renderToString } from 'react-dom/server';
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import { MdLocationPin as LoactionIcon } from 'react-icons/md';

  const createCustomIcon = (color) => {
    const iconElement = renderToString(<LoactionIcon size={32} color={color} />);
    return L.divIcon({
      html: `<div>${iconElement}</div>`,
      iconSize: [32, 32],
      className: 'custom-icon',
    });
  };

  const ChangeMapView = ({ bounds, activeCard, markerRefs }) => {
    const map = useMap();

    useEffect(() => {
      if (bounds && bounds.length) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }, [bounds, map]);

    const handleMoveEnd = debounce(() => {
      if (map && activeCard) {
        const marker = markerRefs.current[activeCard];
        if (marker) {
          const latLng = marker.getLatLng();
          if (map.getCenter().distanceTo(latLng) < 1) {
            marker.openPopup();
          }
        }
      }
    }, 500);

    useEffect(() => {
      map.on('moveend', handleMoveEnd);
      return () => {
        map.off('moveend', handleMoveEnd);
      };
    }, [map,handleMoveEnd]);

    useEffect(() => {
      if (map && activeCard) {
        const marker = markerRefs.current[activeCard];
        if (marker) {
          const latLng = marker.getLatLng();
          if (map.getCenter().distanceTo(latLng) < 1) {
            marker.openPopup();
          }
          map.flyTo(latLng, 13, { duration: 1 });
        }
      }
    }, [activeCard, map, markerRefs]);

    return null;
  };

  const MapBox = ({ mapData, activeCard, setActiveCard }) => {
    const defaultColor = "#12305b";
    const clickedColor = "#ff0000";

    const [data, setData] = useState([
      { _id: 12, latitude: 51.8566, longitude: -0.09, name: 'Paris' },
      { _id: 13, latitude: 51.5200, longitude: -0.09, name: 'Berlin' }
    ]);


    const bounds = data.map((item) => [item.latitude, item.longitude]);
    const handleListItemClick = (item, map) => {
      setActiveCard(item._id);
      // map.flyTo([item.latitude, item.longitude], 7);
    };

    useEffect(() => {
      if(mapData){
        setData(mapData)
      }
    }, [mapData])

    const markerRefs = useRef({});

    useEffect(() => {
      if (activeCard && markerRefs.current[activeCard]) {
        markerRefs.current[activeCard].openPopup();

      }
    }, [activeCard]);

    // const [map, setMap] = useState(null);

    return (
      <>
        <MapContainer
          // whenCreated={setMap} 
          className='cityInfo-map-box-container'

        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeMapView bounds={bounds} activeCard={activeCard} markerRefs={markerRefs} />
          {data && data.map((item) => (
            <Marker
              ref={(el) => { markerRefs.current[item._id] = el; }}
              key={item._id}
              position={[item.latitude, item.longitude]}
              icon={activeCard === item._id ? createCustomIcon(clickedColor) : createCustomIcon(defaultColor)}
              eventHandlers={{
                click: (e) => {
                  handleListItemClick(item, e.target._map)
                }
              }}
            >
              {activeCard === item._id && <Popup>{item.name}</Popup>}
            </Marker>
          ))}
        </MapContainer>
      </>
    );
  };

  export default MapBox;
