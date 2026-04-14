import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Style/SignUp.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const url = "http://localhost:5000";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    setError("");

    // ✅ Validation
    if (!form.username || !form.password || !form.confirmPassword) {
      return setError("All fields are required");
    }

    if (form.password.length < 4) {
      return setError("Password must be at least 4 characters");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const res = await axios.post(`${url}/signup`, {
        username: form.username,
        password: form.password,
      });

      if (res.data.success) {
        alert("Signup successful 🎉");
        navigate("/login"); // ✅ smooth redirect
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account ✨</h2>
        <p className="subtitle">Start your journey with us</p>

        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        {/* Error */}
        {error && <p className="error-text">{error}</p>}

        {/* Button */}
        <button onClick={handleSignup}>Sign Up</button>

        {/* Redirect */}
        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;