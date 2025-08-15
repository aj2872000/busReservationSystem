import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusesRequest, fetchBookingsRequest } from "../store/busSlice";
import BusTile from "../components/BusTile";
import "./LandingPage.css"

const LandingPage = () => {
  const dispatch = useDispatch();
  const { buses, loading } = useSelector(state => state.bus);

  useEffect(() => {
    dispatch(fetchBusesRequest())
  }, [])

  if (loading) return <p>Loading buses...</p>;

  return (
    <section className="bus-section">
      <h2>Available Buses</h2>
      <div className="tile-container">
        {buses.map((bus) => (
          <BusTile key={bus.bus_id} bus={bus} />
        ))}
      </div>
    </section>
  );
};

export default LandingPage;
