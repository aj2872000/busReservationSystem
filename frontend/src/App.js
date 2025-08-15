// import React from "react";
// import ViewBuses from "./components/ViewBuses";
// import BookTicket from "./components/BookTicket";
// import CancelTicket from "./components/CancelTicket";
// import ViewBookings from "./components/ViewBookings";

// function App() {
//   return (
//     <div className="app">
//       <h1>🚌 Bus Reservation System</h1>

//       <div className="grid">
//         <section className="card">
//           <h2>Available Buses</h2>
//           <ViewBuses />
//         </section>

//         <section className="card">
//           <h2>Book a Ticket</h2>
//           <BookTicket />
//         </section>
//       </div>

//       <div className="grid">
//         <section className="card">
//           <h2>Cancel a Ticket</h2>
//           <CancelTicket />
//         </section>

//         <section className="card">
//           <h2>My Bookings</h2>
//           <ViewBookings />
//         </section>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusesRequest, fetchBookingsRequest } from "./store/busSlice";
import LoginPage from "./pages/LoginPages";
import LandingPage from "./pages/LandingPage";
import SeatsPage from "./pages/SeatsPage";
import "./App.css";

function AppWrapper() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user?.name || !user?.mobile) {
      navigate("/login");
    }

    dispatch(fetchBusesRequest());
    dispatch(fetchBookingsRequest({mobile: user?.mobile}));
  }, [user, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/seats/:busId" element={<SeatsPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
