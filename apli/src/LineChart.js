import { Chart as ChartJS } from "chart.js/auto";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

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

function LineChart() {
  const drones = useDroneData();

  // Transform drone data to numerical values based on nature
  const dataValues = drones.map(drone => {
    return drone.nature === 'ami' ? 0 : 1;
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
            return value === 0 ? 'ami' : 'hostile';
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="LineChartContainer" style={{ width: 700 }}>
      <Line data={userData} options={options} />
    </div>
  );
}

export default LineChart;
