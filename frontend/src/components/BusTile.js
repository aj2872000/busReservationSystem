import React from "react";
import { useNavigate } from "react-router-dom";

const BusTile = ({ bus }) => {
  const navigate = useNavigate();
  return (
    <div className="bus-tile">
      <h3>{bus.name}</h3>
      <p>{bus.source} → {bus.destination}</p>
      <p>Total Seats: {bus.total_seats}</p>
      <p>Available: {bus.available_seats}</p>
      <button onClick={() => navigate(`/seats/${bus.bus_id}`)}>Book Now</button>
    </div>
  );
};

export default BusTile;
