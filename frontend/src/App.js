import React from "react";
import ViewBuses from "./components/ViewBuses";
import BookTicket from "./components/BookTicket";
import CancelTicket from "./components/CancelTicket";
import ViewBookings from "./components/ViewBookings";

function App() {
  return (
    <div className="app">
      <h1>🚌 Bus Reservation System</h1>

      <div className="grid">
        <section className="card">
          <h2>Available Buses</h2>
          <ViewBuses />
        </section>

        <section className="card">
          <h2>Book a Ticket</h2>
          <BookTicket />
        </section>
      </div>

      <div className="grid">
        <section className="card">
          <h2>Cancel a Ticket</h2>
          <CancelTicket />
        </section>

        <section className="card">
          <h2>My Bookings</h2>
          <ViewBookings />
        </section>
      </div>
    </div>
  );
}

export default App;
