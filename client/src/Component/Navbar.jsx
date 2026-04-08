import React from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Style/Navbar.css';

function Navbar() {
  const userId = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (
    <div className='navbar'>
      
      <div>
        <img src="./lala" alt="Logo" />
      </div>

      <div className='nav-links'>
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
          Home
        </NavLink>

        <NavLink to="/packages" className={({ isActive }) => isActive ? "active" : ""}>
          Packages
        </NavLink>

        {/* ✅ SHOW ONLY IF LOGGED IN */}
        {userId && (
          <>
            <NavLink to="/orders" className={({ isActive }) => isActive ? "active" : ""}>
              Orders
            </NavLink>

            <NavLink to="/cart" className={({ isActive }) => isActive ? "active" : ""}>
              <ShoppingCartIcon />
            </NavLink>
          </>
        )}
      </div>

      <div>
        {/* ✅ SHOW LOGIN/SIGNUP IF NOT LOGGED IN */}
        {!userId ? (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </>
        ) : (
          <>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;