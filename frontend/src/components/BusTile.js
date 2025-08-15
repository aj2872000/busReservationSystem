import React from "react";
import { useNavigate } from "react-router-dom";
import "./BusTile.css"

const BusTile = ({ bus }) => {
  const navigate = useNavigate();
  return (
    <div className="bus-tile">
      <div>
        <h3 className="bus-name">{bus.name}</h3>
        <p className="bus-details">
          Route: {bus.source} → {bus.destination} <br />
          Departure: {bus.time} <br />
          Seats Available: {bus.available_seats} / {bus.total_seats}
        </p>
      </div>
      <button className="book-button" onClick={() => navigate(`/seats/${bus.bus_id}`)}>Book a Ticket</button>
    </div>
  );
};

export default BusTile;
