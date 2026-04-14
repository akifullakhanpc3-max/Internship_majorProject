import React, { useState } from "react";
import axios from "axios";
import "./Style/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const url = "http://localhost:5000";

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${url}/login`, {
        username,
        password
      });

      if (res.data.success) {
        // ✅ SAVE USER ID
        localStorage.setItem("userId", res.data.userId);

        alert("Login successful");
        window.location.href = "/packages";
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-container">
    <div className="login-card">

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
    </div>
  );
}

export default Login;