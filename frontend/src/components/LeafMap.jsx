import { TileLayer, Marker, Popup, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { useEffect, useState, useRef } from "react"; // Import useRef
import { markerPositions } from "../constants/leafMap";
import you from "../assets/LeafMap/you.svg";
const LeafMap = ({ center }) => {
  const zoom = 20;
  const mapRef = useRef(null); // Create a ref for MapContainer

  const LeafIcon = L.Icon.extend({
    options: {
      iconSize: [35, 35],
      iconAnchor: [30, 30],
      popupAnchor: [-12, -30],
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null,
    },
  });

  const blueIcon = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF",
    }),
    redIcon = new LeafIcon({
      iconUrl: you,
    });

  // Update map center when the 'center' prop changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(center, zoom);
    }
  }, [center, zoom]);

  return (
    <div className="w-3/4 h-3/4 mx-auto border-2 border-black max-lg:w-[90%]">
      <MapContainer
        style={{ height: "75vh", width: "100%" }}
        zoom={zoom}
        center={{ lat: 19.076, lng: 72.8777 }}
        scrollWheelZoom={true}
        ref={mapRef} // Assign the ref to the MapContainer
      >
        <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {markerPositions.map((position, index) => (
          <Marker key={index} position={[position.lat, position.long]}>
            <Popup>{position.address}</Popup>
          </Marker>
        ))}
        {center && (
          <Marker position={[center.lat, center.lng]} icon={redIcon}>
            <Popup>You</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default LeafMap;
