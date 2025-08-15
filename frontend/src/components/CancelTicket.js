import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cancelTicketRequest } from "../store/busSlice";

function CancelTicket() {
  const [name, setName] = useState("");
  const [busId, setBusId] = useState("");
  const [seatNo, setSeatNo] = useState("");
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(cancelTicketRequest({ name, bus_id: busId, seat_no: seatNo }));
  };

  return (
    <div>
      <input className="input" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input className="input" placeholder="Bus ID" value={busId} onChange={e => setBusId(e.target.value)} />
      <input className="input" placeholder="Seat No" value={seatNo} onChange={e => setSeatNo(e.target.value)} />
      <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default CancelTicket;
