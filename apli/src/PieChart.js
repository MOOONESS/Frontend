
import { Chart as ChartJS } from "chart.js/auto";
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";

function useDroneData() {
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8000/drones/sse');

    eventSource.onopen = () => console.log('start connection');

    eventSource.onmessage = (event) => {
      try {
        const newDrones = JSON.parse(JSON.parse(event.data).data);
        setDrones(Array.isArray(newDrones) ? newDrones : []);
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
  }, []);

  return drones;
}

function PieChart() {
  const drones = useDroneData();

  // Count occurrences of each drone nature
  const amiCount = drones.filter(drone => drone.nature === 'ami').length;
  const hostileCount = drones.filter(drone => drone.nature === 'hostile').length;

  const data = {
    labels: ['Ami', 'Hostile'],
    datasets: [{
      data: [amiCount, hostileCount],
      backgroundColor: ['#87CEEB', '#8B0000'], // Light blue for ami and dark red for hostile
      hoverBackgroundColor: ['#87CEEB', '#8B0000'], // Hover colors
      borderWidth: 2,
      borderColor: '#ffffff' // Border color
    }]
  };

  const options = {
    maintainAspectRatio: false, // Disable aspect ratio to allow resizing
    legend: {
      display: true,
      position: 'right',
      labels: {
        fontColor: '#333',
        fontSize: 14,
        padding: 20
      }
    },
    title: {
      display: true,
      text: 'Drone Distribution',
      fontSize: 20,
      fontColor: '#333',
      padding: 20
    }
  };

  return (
    <div style={{ width: 500, height: 250 }}>
      <Pie data={data} options={options} />
    </div>
  );
}

export default PieChart;

