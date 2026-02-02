// MapComponent.tsx
import React  from "preact/hooks";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.scss";
import { FunctionalComponent } from "preact";

// Tọa độ của khu vực bạn muốn hiển thị
const position = [10.136, 105.529];

const MapComponent: FunctionalComponent = () => {
  return (
    <div style={{ height: "200px", width: "200px" }}>
      <MapContainer
        center={position}
        zoom={8}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>Đây là vị trí bạn đang xem trên bản đồ.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
