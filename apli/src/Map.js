import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import amiIconUrl from './ami.png'; // Import custom ami icon
import hostileIconUrl from './hostile.png'; // Import custom hostile icon

function Map() {
  const [drones, setDrones] = useState([]);
  const [maxPositions, setMaxPositions] = useState({}); // Initialize maxPositions state
  const [positionIndex, setPositionIndex] = useState(0); // Initialize position index state

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8000/drones/sse');

    eventSource.onopen = () => console.log('Connected to SSE server');

    eventSource.onmessage = (event) => {
      try {
        const newDrones = JSON.parse(JSON.parse(event.data).data);
        setDrones(newDrones);

        // Find the maximum position among all drones for each numero
        const newMaxPositions = {};
        newDrones.forEach(drone => {
          if (!newMaxPositions.hasOwnProperty(drone.numero) || newMaxPositions[drone.numero] < drone.maxpos) {
            newMaxPositions[drone.numero] = drone.maxpos;
          }
        });
        setMaxPositions(newMaxPositions);
      } catch (error) {
        console.error('Error parsing SSE data:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('Error with SSE connection:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
      console.log('SSE connection closed');
    };
  }, []); // Removed [drones] from dependency array as it caused infinite loop

  // Define custom drone icon for each type
  let droneIcons = {
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

  // Function to handle updating position index every 4 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPositionIndex((prevIndex) => {
        // If current position index is less than the minimum maxpos among all drones, increment it
        const minMaxPos = Math.min(...Object.values(maxPositions));
        return prevIndex < minMaxPos ? prevIndex + 1 : prevIndex;
      });
    }, 4000);
    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [maxPositions]); // Corrected dependency to [maxPositions]

  return (
    <div className='MapContainer'>
      <MapContainer
        center={[36.5, 9.93]}
        zoom={8}
        style={{ width: '100%', height: '90%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {drones.map((drone) => (
          // Check if drone's position matches the current position index and is within its maxpos
          drone.pos === positionIndex && drone.pos <= maxPositions[drone.numero] && (
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
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
