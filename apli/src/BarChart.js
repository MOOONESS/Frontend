import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

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

function BarChart() {
  const drones = useDroneData();

  const dataValues = drones.map(drone => {
    return drone.nature === 'ami' ? 0.5 : 1;
  });

  const userData = {
    labels: Array.from(new Set(drones.map(drone => drone.id+1))), // X-axis: labels for Line chart
    datasets: [
      {
        label: 'drone category',
        data: dataValues, // Y-axis: numerical data for Line chart
        backgroundColor: dataValues.map(value => value === 0.5 ? '#808080' : '#000000'), // Gray for 'ami' and black for 'hostile'
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
    <div style={{ width: 1000 , height:115 }}>
      <Bar data={userData} options={options} />
    </div>
  );
}

export default BarChart;
