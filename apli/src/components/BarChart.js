import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({drones}) {
  const uniqueNumeros = new Set();
const dataValues = drones.map(drone => {
    if (!uniqueNumeros.has(drone.numero)) {
        uniqueNumeros.add(drone.numero);
        return drone.nature === 'ami' ? 0.5 : 1;
    }
    return null; // or any default value for duplicate "numero" drones
}).filter(value => value !== null);


  const userData = {
    labels: Array.from(new Set(drones.map(drone => drone.numero))), // X-axis: labels for Line chart
    datasets: [
      {
        label: 'drone category',
        data: dataValues, // Y-axis: numerical data for Line chart
        backgroundColor: dataValues.map(value => value === 0.5 ? '#2E8B57' : '#CE2029'), // Gray for 'ami' and black for 'hostile'
        borderWidth: 1,
        borderColor: '#333', // Border color
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          min: 0.5,
          max: 1,
          stepSize: 0.5,
          callback: function(value, index, values) {
            return value === 0.5 ? 'ami' : (value === 1 ? 'hostile' : '');
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    },
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
    <div style={{ width: 1000 , height:"75%" }}>
      <Bar data={userData} options={options} />
    </div>
  );
}

export default BarChart;
