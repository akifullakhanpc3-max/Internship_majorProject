import React from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Style/Navbar.css';
import Dashboard from './Dashboard';

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
            

            
          </>
        )}
      </div>

      <div>
        {/* ✅ SHOW LOGIN/SIGNUP IF NOT LOGGED IN */}
        {!userId ? (
          <div className='auth-links'>
            <NavLink className='login'to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>

          </div>
        ) : (
          <>
            <Dashboard/>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;