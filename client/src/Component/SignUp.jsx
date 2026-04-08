import React, { useState } from "react";
import axios from "axios";
import "./Style/SignUp.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const url = "http://localhost:5000";

  const handleSignup = async () => {
    try {
      const res = await axios.post(`${url}/signup`, {
        username,
        password,
      });

      alert(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Signup</h2>

        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
}

export default Signup;
