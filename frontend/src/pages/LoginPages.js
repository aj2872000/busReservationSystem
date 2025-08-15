import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { checkOrCreateUserRequest } from "../store/userSlice"
import { useNavigate } from "react-router-dom";

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
    <section>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <label>Mobile:</label>
        <input value={mobile} onChange={(e) => setMobile(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default LoginPage;
