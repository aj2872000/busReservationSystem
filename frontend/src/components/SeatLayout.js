import React from "react";
import { FaChair } from "react-icons/fa";
import "./SeatLayout.css"

const SeatLayout = ({ totalSeats, availableSeats, bookedSeats, mySeat, available_seat_numbers, onSeatClick }) => {
  const seats = available_seat_numbers;

  const getSeatClass = (seatNum) => {
    if (mySeat.includes(seatNum)) return "seat seat-my-booking";
    if (bookedSeats.includes(seatNum)) return "seat seat-booked";
    return "seat seat-available";
  };

  return (
    <div className="seat-layout">
      {seats.map((seat) => {
        let className = getSeatClass(seat);
        return (
          <div
            key={seat}
            className={className}
            onClick={() => {
              if (className !== "seat seat-booked" || className === "seat seat-my-booking") {
                onSeatClick(seat);
              }
            }}
          >
            <FaChair />
            <span>{seat}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SeatLayout;
