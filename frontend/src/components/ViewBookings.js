import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingsRequest } from "../store/busSlice";

function ViewBookings() {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector(state => state.bus);

  useEffect(() => {
    dispatch(fetchBookingsRequest());
  }, [dispatch]);

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div>
      {bookings.map((b, idx) => (
        <div key={idx}>
          {b[0]} - Bus {b[1]} - Seat {b[2]}
        </div>
      ))}
    </div>
  );
}

export default ViewBookings;
