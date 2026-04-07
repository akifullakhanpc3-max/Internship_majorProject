import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './AdminNav.css';
import { useNavigate } from 'react-router-dom';

function AdminNav() {
    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // 🔥 removes everything
    navigate("/login");
  };

  

    const [menu, setMenu] = useState(false);
    //const [isActive, setisActive] = useState(false)

    return (
        <nav className="admin-nav">

            {/* Logo */}
            <div onClick={()=>{
                window.location.href="/dashboard"
            }} className="logo">
                <h1 >Admin</h1>
            </div>

            {/* Hamburger */}
            <div className="hamburger" onClick={() => setMenu(!menu)}>
                ☰
            </div>
            {/* <div className={`nav-links ${menu ? "open" : ""}`}></div> */}
            {/* Links */}
            <div className={`nav-links ${menu ? "open" : ""}`}>
                <NavLink onClick={()=>{setMenu(false)}} to="/dashboard" className={({ isActive }) => isActive ? "bgc" : ""}>
                    Dashboard
                </NavLink>

                <NavLink onClick={()=>{setMenu(false)}} to="/booking" className={({ isActive }) => isActive ? "bgc" : ""}>
                    Bookings
                </NavLink>

                <NavLink onClick={()=>{setMenu(false)}} to="/package" className={({ isActive }) => isActive ? "bgc" : ""}>
                    Packages
                </NavLink>

                <NavLink onClick={()=>{setMenu(false)}} to="/payment" className={({ isActive }) => isActive ? "bgc" : ""}>
                    Payments
                </NavLink>

                <NavLink onClick={()=>{setMenu(false)}} to="/customization" className={({ isActive }) => isActive ? "bgc" : ""}>
                    Customization
                </NavLink>
                {/* Logout */}
                <button onClick={handleLogout}>Logout</button>
            </div>



        </nav>
    );
}

export default AdminNav;