
import { Chart as ChartJS } from "chart.js/auto";
import React from "react";
import { Pie } from "react-chartjs-2";


function PieChart({drones}) {

  // Count occurrences of each drone nature
  const amiCount = new Set(drones.filter(drone => drone.nature === 'ami').map(drone => drone.numero)).size;
  const hostileCount = new Set(drones.filter(drone => drone.nature === 'hostile').map(drone => drone.numero)).size;

  const data = {
    labels: ['friend', 'foe'],
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
    <div style={{ width: 350, height: 250 }}>
      <Pie data={data} options={options} />
    </div>
  );
}

export default PieChart;

