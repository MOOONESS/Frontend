import React from "react";
import Navbar from "./Navbar"
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import Map from "./Map";
import "./App.css"


function App() {
  return (
    <div className="App">
      <div className="Navbar"><Navbar/></div>
      <div className="Body"> 
        <div className="content">
          <div className="MapContainer"><Map /></div>
          <div className="PieChartContainer">
            <h3>PieChart</h3>
            <PieChart />
          </div>
        </div>
        <div className="BarChartContainer">
          <h3>BarChart</h3>
          <BarChart />
        </div>
      </div>
    </div>
  );
}

export default App;
