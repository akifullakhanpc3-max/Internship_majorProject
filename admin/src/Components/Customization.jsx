import React, { useEffect, useState } from 'react';
import "./Customization.css";
import axios from 'axios';

function Customization() {
  const url = process.env.REACT_APP_SERVER_URL;

  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ✅ FETCH ADMIN DATA (RUN ONLY ONCE)
  useEffect(() => {
    async function getadmindata() {
      try {
        let admin = localStorage.getItem("username");
        if (!admin) return;

        const response = await axios.get(`${url}/get-admin-data/${admin}`);
        const data = response.data.data;

        if (data) {
          setUsername(data.username);
          setPassword(data.password);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    }

    getadmindata();
  }, [url]);

  // ✅ UPDATE HANDLER
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const oldUsername = localStorage.getItem("username");

      const response = await axios.put(
        `${url}/update-admin/${oldUsername}`,
        {
          newUsername: username,
          password: password
        }
      );

      if (response.data.success) {
        alert("Updated successfully ✅");

        // update localStorage if username changed
        localStorage.setItem("username", username);
      } else {
        alert(response.data.message || "Update failed");
      }

    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className='customization'>

      {/* HEADER */}
      <div className='header'>
        <h1>Customization</h1>
      </div>

      {/* CONFIG */}
      <div className="config">
        <div className='configuration'>
          <p>Admin Config</p>

          <form className='card' onSubmit={handleUpdate}>

            {/* USERNAME */}
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label>Password:</label>
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShow(!show)}
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>

            {/* UPDATE BUTTON */}
            <button type="submit">Update</button>

          </form>
        </div>
      </div>

      <div className='lala'></div>

    </div>
  );
}

export default Customization;
