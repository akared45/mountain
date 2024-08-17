import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent = ({ dataInfor }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!dataInfor || !dataInfor.longitude || !dataInfor.latitude) {
      console.error('Invalid dataInfor:', dataInfor);
      return;
    }

    // Set Mapbox access token
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2FtZWhhbWUyMTEyIiwiYSI6ImNsejd4bWVnMDAxaW4yanNlZWM5cW1qZ3gifQ.HVJHnHh6vfs00-6RsuAxhQ';

    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // DOM element to attach the map
      style: 'mapbox://styles/mapbox/outdoors-v11', // Map style with 3D terrain
      center: [dataInfor.longitude, dataInfor.latitude], // Map center coordinates (longitude, latitude)
      zoom: 10, // Zoom level
      pitch: 60, // Tilt the map to create a 3D effect
      bearing: -17.6, // Rotate the map
    });

    // Load the terrain data and add it to the map
    map.on('style.load', () => {
      map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.terrain-rgb'
      });
      map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

      // Display 3D buildings if present in the style
      if (map.getLayer('building')) {
        map.setLayerZoomRange('building', 12, 22);
      }
    });

    // Add a marker for the specified coordinates
    new mapboxgl.Marker()
      .setLngLat([dataInfor.longitude, dataInfor.latitude])
      .setPopup(new mapboxgl.Popup().setText(`${dataInfor.name}`))
      .addTo(map);

    // Clean up map instance on component unmount
    return () => {
      map.remove();
    };
  }, [dataInfor]); // Dependency array ensures effect runs when dataInfor changes

  return (
    <div>
      <h1>Map</h1>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
};

export default MapComponent;
