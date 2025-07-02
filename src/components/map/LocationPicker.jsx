"use client";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import styles from "./map.module.css";

mapboxgl.accessToken = "pk.eyJ1IjoibGlsLXdvb2siLCJhIjoiY21ieHozZzJxMGJibzJsc2VvY2U4eWw3NyJ9.RmxqRp7hu5PTmGHwN1OTSA"; // Replace this

export default function LocationPicker({ formData, setFormData }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [query, setQuery] = useState(formData?.location || "");
  const [results, setResults] = useState([]);
  const [marker, setMarker] = useState(null);

  const handleSearch = async (value) => {
    setQuery(value);
    if (!value) return setResults([]);

    const res = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json`,
      {
        params: {
          access_token: mapboxgl.accessToken,
          autocomplete: true,
          limit: 5,
        },
      }
    );
    setResults(res.data.features);
  };

  const handleSelect = (place) => {
    const [lng, lat] = place.center;
    setQuery(place.place_name);
    setResults([]);

    if (typeof setFormData === "function") {
      setFormData((prev) => ({
        ...prev,
        location: place.place_name,
        coordinates: { lat, lng },
      }));
    }

    if (mapRef.current) {
      mapRef.current.flyTo({ center: [lng, lat], zoom: 14 });

      if (marker) marker.remove();
      const newMarker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapRef.current);
      setMarker(newMarker);
    }
  };

  const handleMapClick = async (e) => {
    const { lng, lat } = e.lngLat;
    const res = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json`,
      {
        params: { access_token: mapboxgl.accessToken },
      }
    );
    const place = res.data.features[0];
    if (place) handleSelect(place);
  };

  useEffect(() => {
  if (typeof window === "undefined") return; // SSR guard
  if (!mapContainerRef.current || mapRef.current) return; // DOM not ready or already initialized

  const center = formData?.coordinates
    ? [formData.coordinates.lng, formData.coordinates.lat]
    : [36.8219, -1.2921]; // Nairobi

  mapRef.current = new mapboxgl.Map({
    container: mapContainerRef.current,
    style: "mapbox://styles/mapbox/streets-v11",
    center,
    zoom: 13,
  });

  if (formData?.coordinates) {
    const m = new mapboxgl.Marker().setLngLat(center).addTo(mapRef.current);
    setMarker(m);
  }

  mapRef.current.on("click", handleMapClick);

  return () => {
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
  };
}, []);

  return (
    <div>
      <h3 className={styles.groupTitle}>Add Location</h3>

      <div style={{ position: 'relative' }}>
        <input
          type="text"
          className={styles.input}
          placeholder="Search Location"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: "100%" }}
        />

        {results.length > 0 && (
          <ul className={styles.dropdown}>
            {results.map((place) => (
              <li key={place.id} onClick={() => handleSelect(place)}>
                {place.place_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div
        ref={mapContainerRef}
        className={styles.mapBox}
        style={{
          height: "300px",
          marginTop: "1rem",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      />
    </div>
  );
}