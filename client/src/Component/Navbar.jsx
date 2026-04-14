import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Style/Navbar.css';
import Dashboard from './Dashboard';

function Navbar() {
  const userId = localStorage.getItem("userId");
  const [menuOpen, setMenuOpen] = useState(false);

  // const handleLogout = () => {
  //   localStorage.removeItem("userId");
  //   window.location.href = "/";
  // };

  return (
    <div className='navbar'>

      {/* LOGO */}
      <div className='logo'>
        <img src="./lala" alt="Logo" />
      </div>

      {/* HAMBURGER */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* NAV LINKS */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/packages" onClick={() => setMenuOpen(false)}>Packages</NavLink>
        <NavLink to="/aboutus" onClick={() => setMenuOpen(false)}>About us</NavLink>
        <NavLink to={'/contact'} onClick={()=>setMenuOpen(false)}>Contact</NavLink>

        {/* AUTH INSIDE MOBILE MENU */}
        {!userId ? (
          <div className='auth-links mobile-auth'>
            <NavLink className='login' to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
            <NavLink to="/signup" onClick={() => setMenuOpen(false)}>Signup</NavLink>
          </div>
        ) : (
          <div className="mobile-auth">
            <Dashboard />
          </div>
        )}
      </div>

      {/* DESKTOP AUTH */}
      <div className='desktop-auth'>
        {!userId ? (
          <div className='auth-links'>
            <NavLink className='login' to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </div>
        ) : (
          <Dashboard />
        )}
      </div>
    </div>
  );
}

export default Navbar;