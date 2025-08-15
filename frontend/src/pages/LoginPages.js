import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { checkOrCreateUserRequest } from "../store/userSlice"
import { useNavigate } from "react-router-dom";
import './Login.css'

const LoginPage = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!name || !mobile) {
      alert("Please fill both fields");
      return;
    }
    dispatch(checkOrCreateUserRequest({ name, mobile }));
    navigate("/");
  };

  return (
    <div className="login-container">
      <h2 className="login-title">🚌 Bus Reservation</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-field">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="input-field">
          <label>Mobile Number</label>
          <input
            type="tel"
            placeholder="Enter your mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            pattern="[0-9]{10}"
          />
        </div>

        <button type="submit" className="login-button">Continue</button>
      </form>
      <div className="login-footer">
        Your mobile number will be used to verify bookings.
      </div>
    </div>
  );
};

export default LoginPage;
