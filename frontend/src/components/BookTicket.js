import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookTicketRequest } from "../store/busSlice";

function BookTicket() {
  const [name, setName] = useState("");
  const [busId, setBusId] = useState("");
  const [seatNo, setSeatNo] = useState("");
  const dispatch = useDispatch();
  const { buses } = useSelector(state => state.bus);

  const handleBook = () => {
    dispatch(bookTicketRequest({ name, bus_id: busId, seat_no: seatNo }));
  };

  return (
    <div>
      <input className="input" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <select className="input" value={busId} onChange={e => setBusId(e.target.value)}>
        <option value="">Select Bus</option>
        {buses.map(bus => <option key={bus.bus_id} value={bus.bus_id}>{bus.name}</option>)}
      </select>
      <input className="input" placeholder="Seat No" value={seatNo} onChange={e => setSeatNo(e.target.value)} />
      <button className="btn btn-primary" onClick={handleBook}>Book</button>
    </div>
  );
}

export default BookTicket;
