import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusesRequest } from "../store/busSlice";

function ViewBuses() {
  const dispatch = useDispatch();
  const { buses, loading } = useSelector(state => state.bus);

  useEffect(() => {
    dispatch(fetchBusesRequest());
  }, [dispatch]);
console.log('ajay12', buses, loading)
  if (loading) return <p>Loading buses...</p>;

  return (
    <div>
      {buses.map(bus => (
        <div key={bus.bus_id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <strong>{bus.name}</strong> ({bus.bus_id})<br />
          {bus.source} ➜ {bus.destination} @ {bus.time}<br />
          Total Seats: {bus.total_seats} | Available: {bus.available_seats}<br />
          Seats: {bus.available_seat_numbers.join(", ")}
        </div>
      ))}
    </div>
  );
}

export default ViewBuses;
