import { Chart as ChartJS } from "chart.js/auto";
import React from "react";
import { Line } from "react-chartjs-2";


function LineChart({drones}) {
  // Transform drone data to numerical values based on nature
  const dataValues = drones.map(drone => {
    return drone.nature === 'ami' ? 0 : (drone.nature === 'hostile' ? 1 : null);
  });

  const userData = {
    labels: Array.from(new Set(drones.map(drone => drone.id))), // X-axis: labels for Line chart
    datasets: [
      {
        label: 'Drone number',
        data: dataValues, // Y-axis: numerical data for Line chart
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          callback: function(value, index, values) {
            return value === 0 ? 'ami' : (value === 1 ? 'hostile' : '');
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }},
      responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: '#333',
      bodyFontColor: '#fff',
      titleFontColor: '#fff',
      titleAlign: 'center',
      bodyAlign: 'center',
      displayColors: false,
      cornerRadius: 5,
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart',
    },
  };

  return (
    <div style={{width: 865 , height:"80%"}}>
      <Line data={userData} options={options} />
    </div>
  );
}

export default LineChart;
