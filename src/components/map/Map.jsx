'use client';
import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibGlsLXdvb2siLCJhIjoiY21ieHozZzJxMGJibzJsc2VvY2U4eWw3NyJ9.RmxqRp7hu5PTmGHwN1OTSA';

export default function MapComponent() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [36.8219, -1.2921], // Nairobi coords
      zoom: 10,
    });

    // Optional: Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => map.remove(); // Cleanup on unmount
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: '400px', height: '400px', borderRadius: '12px' }}
    />
  );
}
