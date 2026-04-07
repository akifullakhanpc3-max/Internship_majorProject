import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

function FirstTime(){
  return(
    <div className="firstTime">
      <p>
        if you are new to admin panel you can login with username as admin and password as admin
      </p>
    </div>
  )
}

function Login() {
  const navigate = useNavigate();
  const url = process.env.REACT_APP_SERVER_URL;

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  // 🔥 Auto redirect if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${url}/admin`, {
        username: form.username,
        password: form.password
      });

      if (response.data.success) {
        // ✅ Save login info
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", form.username);

        // Optional: if backend sends token
        // localStorage.setItem("token", response.data.token);

        navigate("/dashboard");
      } else {
        setError("Invalid username or password");
      }

    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {/* 🔴 Error Message */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Login</button>
      </form>
      <FirstTime/>
    </div>
  );
}

export default Login;