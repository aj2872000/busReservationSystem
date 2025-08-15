import React from "react";
import { FaChair } from "react-icons/fa";

const SeatLayout = ({ totalSeats, availableSeats, bookedSeats, mySeat, available_seat_numbers, onSeatClick }) => {
  const seats = available_seat_numbers;

  return (
    <div className="seat-layout">
      {seats.map((seat) => {
        console.log('ajay18',seat,bookedSeats)
        let className = "seat available";
        if (mySeat.includes(seat)) className = "seat my-seat";
        else if (bookedSeats.includes(seat)) className = "seat booked";

        return (
          <div
            key={seat}
            className={className}
            onClick={() => {
              if (className !== "seat booked" || className === "seat my-seat") {
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
