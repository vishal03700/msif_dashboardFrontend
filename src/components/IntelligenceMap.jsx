import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.DivIcon({
  className: "custom-marker-wrapper",
  html: '<span class="custom-marker-dot"></span>',
  iconSize: [18, 18],
  iconAnchor: [9, 9]
});

const IntelligenceMap = ({ points }) => {
  return (
    <section className="map-panel">
      <div className="panel-heading">
        <div>
          <p className="panel-title">Geo Intelligence Layer</p>
          <h2>Interactive Source Plot</h2>
        </div>
        <span className="map-counter">{points.length} active points</span>
      </div>

      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={2}
        scrollWheelZoom
        className="intelligence-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {points.map((point) => (
          <Marker key={point._id} position={[point.lat, point.lng]} icon={markerIcon}>
            <Popup className="intel-popup">
              <div className="popup-card">
                <img
                  src={point.imageUrl || "https://placehold.co/600x400/1a1a1a/f0f0f0?text=No+Image"}
                  alt={point.type}
                />
                <div>
                  <span className="popup-tag">{point.type}</span>
                  <p>{point.description}</p>
                  <small>
                    Coordinates: {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
                  </small>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
};

export default IntelligenceMap;
