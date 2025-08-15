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
    <div className="app-container">
      <header className="app-header">
        🚌 Bus Reservation System
      </header>

      <main className="app-content">
        <Router>
          <AppWrapper />
        </Router>
      </main>

      <footer className="app-footer">
        © {new Date().getFullYear()} Bus Reservation System
      </footer>
    </div>
  );
}
