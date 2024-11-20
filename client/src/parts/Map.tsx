import React, { useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { Place } from "../../../shared/types";
import { highlightColor } from "../../../shared/palette";

interface MapProps {
  places: Place[];
}

export const MapView: React.FC<MapProps> = ({ places }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maptilersdk.Map | null>(null);

  maptilersdk.config.apiKey = "3osg94AHkXsO4NqeccMX";
  useEffect(() => {
    if (map.current) return;
    
    map.current = new maptilersdk.Map({
      container: mapContainer.current!,
      style: "https://api.maptiler.com/maps/379d136c-a428-43af-8262-ece4ba972a44/style.json?key=3osg94AHkXsO4NqeccMX",
      center: [2.434, 46.84],
      zoom: 5,
    });

    places.forEach((place) => {
      new maptilersdk.Marker({ color: highlightColor })
        .setLngLat([place.longitude, place.latitude])
        .addTo(map.current!)
        .setPopup(
          new maptilersdk.Popup().setHTML(
            `<strong>${place.city}</strong><br>${place.country}`
          )
        );
    });
  }, [places, 2.434, 46.84, 5]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};
