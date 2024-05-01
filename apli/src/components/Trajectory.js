import React,{useState} from 'react'
import iconImage from '../images/icon.png';
import { Polyline } from 'react-leaflet';

function Trajectory() {
    const [showInput, setShowInput] = useState(false);
    const [droneNumber, setDroneNumber] = useState('');
    const [showTrajectory, setShowTrajectory] = useState(false);
    const [selectedDroneNumber, setSelectedDroneNumber] = useState(null);
  
    const dronePositions = [
      { name: 'drone 1', position: [36.83, 10.13], trajectory: [[36.83, 10.13], [36.93, 9.94], [36.96, 9.72],[36.95, 9.55],[36.92, 9.35],[36.88, 9.185],[36.8, 8.95]] },
      { name: 'drone 2', position: [36.3, 9.53], trajectory: [[36.3, 9.53], [36.28, 9.38], [36.43, 9.36],[36.53, 9.49],[36.56, 9.617],[36.62, 9.7],[36.678, 9.81]] },
      { name: 'drone 3', position: [36.6, 10.43], trajectory: [[36.6, 10.43], [36.61, 10.51], [36.49, 10.57],[36.38, 10.49],[36.36, 10.3],[36.43, 10.2],[36.45, 9.97]] },
      { name: 'drone 4', position: [36.343, 8.97], trajectory: [[36.343, 8.97],[36.78, 9.68], [36.824, 9.583], [36.728, 9.553],[36.7, 9.49],[36.673, 9.4]] }
    ];
    const showTrajectoryHandler = (droneIndex) => {
      setShowTrajectory(true);
      setShowInput(false);
      setDroneNumber('');
      setSelectedDroneNumber(droneIndex);
    };
  return (
    <div>
        {showTrajectory && selectedDroneNumber !== null && (
          <Polyline positions={dronePositions[selectedDroneNumber].trajectory} pathOptions={{
            color: 'blue',
            weight: 3,
            opacity: 0.8,
            dashArray: '9, 10',
            lineCap: 'square',
            lineJoin: 'round'
          }} />
        )}
      <div className="button-container">
        <button id="toggleInputButton" onClick={() => setShowInput(!showInput)}>
          <img src={iconImage} alt="Toggle Input" />
        </button>
        {showInput && (
          <input
            type="text"
            id="droneInput"
            placeholder="Enter drone number (1-4)"
            value={droneNumber}
            onChange={(e) => setDroneNumber(e.target.value)}
          />
        )}
        {showInput && (
          <button id="showTrajectoryButton" onClick={() => showTrajectoryHandler(parseInt(droneNumber) - 1)}>
            Trajectory
          </button>
        )}
      </div>
      </div>
  )
}

export default Trajectory
