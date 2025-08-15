import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SeatLayout from "../components/SeatLayout";
import { bookTicketRequest, cancelTicketRequest } from "../store/busSlice";

const SeatsPage = () => {
  const { busId } = useParams();
  const { buses, bookings , loading } = useSelector(state => state.bus);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const bus = buses.find((b) => parseInt(b.bus_id) === parseInt(busId));
  let myBookedSeatss = [], othersBookedSeatss = []
  if(bookings[busId]){
    const { myBookedSeats, othersBookedSeats } = bookings[busId]
    myBookedSeatss = myBookedSeats
    othersBookedSeatss = othersBookedSeats
  }

  const handleSeatClick = (seatNo) => {
    if (myBookedSeatss.includes(seatNo)) {
      dispatch(cancelTicketRequest({name :user.mobile,  bus_id: busId, seat_no: seatNo }));
    } else if (!myBookedSeatss.includes(seatNo)) {
      dispatch(bookTicketRequest({ name : user.mobile, bus_id: busId, seat_no: seatNo }));
    }
  };

  if (loading) return <p>Loading buses...</p>;

  return (
    <section>
      <h2>{bus.name} ({bus.source} → {bus.destination})</h2>
      <SeatLayout
        totalSeats={bus.total_seats}
        availableSeats={bus.available_seats}
        bookedSeats={othersBookedSeatss}
        mySeat={myBookedSeatss}
        available_seat_numbers={bus.available_seat_numbers}
        onSeatClick={handleSeatClick}
      />
    </section>
  );
};

export default SeatsPage;
