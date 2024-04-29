import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import amiIconUrl from './ami.png'; // Import custom ami icon
import hostileIconUrl from './hostile.png'; // Import custom hostile icon

function Map({ drones }) {

  const [showInput, setShowInput] = useState(false);
  const [carNumber, setCarNumber] = useState('');
  const [showTrajectory, setShowTrajectory] = useState(false);
  const [selectedDrone, setSelectedDrone] = useState(null);

  // Define custom drone icon for each type
  const droneIcons = {
    ami: L.icon({
      iconUrl: amiIconUrl,
      iconSize: [33, 33],
      iconAnchor: [16, 16],
    }),
    hostile: L.icon({
      iconUrl: hostileIconUrl,
      iconSize: [35, 35],
      iconAnchor: [16, 16],
    }),
  };

  const handleShowTrajectory = (drone) => {
    setShowTrajectory(true);
    setShowInput(false); // Hide input field when showing trajectory
    setCarNumber('');
    setSelectedDrone(drone);
  };

  return (
    <div className='MapContainer'>
      <MapContainer
        center={[36.55, 9.5]}
        zoom={9}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showTrajectory && selectedDrone && (
          <Polyline positions={selectedDrone.positions.map(drone => [drone.latitude, drone.longitude])} color="blue" />
        )}
        {drones.map(drone => (
          <Marker
            key={drone.id}
            position={[drone.latitude, drone.longitude]}
            icon={droneIcons[drone.nature]} // Set icon based on drone nature
          >
            <Popup>
              <div>
                <h3>Drone {drone.nature}</h3>
                <p>Drone ID: {drone.id}</p>
                <p>Drone Numero: {drone.numero}</p>
                <p>Drone Position: {drone.pos}</p>
                <button onClick={() => handleShowTrajectory(drone)}>Show Trajectory</button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="button-container">
        <button id="toggleInputButton" onClick={() => setShowInput(!showInput)}>
          Toggle Input
        </button>
        {showInput && (
          <input
            type="text"
            id="carInput"
            placeholder="Enter car number (1-3)"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}

export default Map;
