import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
// import BarChart from "./components/BarChart";
import PieChart from "./PieChart";
import Map from "./Map";
import "./App.css";
import LineChart from "./LineChart";
function Dashboard() {
  const [drones, setDrones] = useState([]);
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8000/drones/sse");

    eventSource.onopen = () => console.log("start connection");

    eventSource.onmessage = (event) => {
      try {
        const newDrones = JSON.parse(JSON.parse(event.data).data);
        console.log("FROM APP --------------------")
        console.log(newDrones)
        console.log("FROM APP --------------------")
        setDrones(Array.isArray(newDrones) ? newDrones : []);
      } catch (error) {
        console.error("Error parsing SSE data:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("Error with SSE connection:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
      console.log("SSE connection closed");
    };
  }, []);

  return (
    <div className="App">
      <div className="Navbar">
        <Navbar />
      </div>
      <div className="Body">
        <div className="content">
          <div className="MapContainer">
            <Map drones={drones}  />
          </div>
          <div className="PieChartContainer">
            <h3>friends % foes </h3>
            <PieChart drones={drones} />
          </div>
        </div>
        <div className="LineChartContainer">
          <h3>Friend or Foe detected by id</h3>
          <LineChart drones={drones} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

