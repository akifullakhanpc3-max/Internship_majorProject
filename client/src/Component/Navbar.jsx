import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Style/Navbar.css';
import Dashboard from './Dashboard';

function Navbar() {
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const toggleDashboard = () => {
    setDashboardOpen(!dashboardOpen);
  };

  return (
    <div className="navbar">

      {/* Logo */}
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
      </div>

      {/* Links */}
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
          Home
        </NavLink>

        <NavLink to="/packages" className={({ isActive }) => isActive ? "active" : ""}>
          Packages
        </NavLink>

        {/* <NavLink to="/orders" className={({ isActive }) => isActive ? "active" : ""}>
          Orders
        </NavLink> */}

        {/* <NavLink to="/cart" className={({ isActive }) => isActive ? "active" : ""}>
          <ShoppingCartIcon />
        </NavLink> */}
      </div>

      {/* Dashboard */}
      <div className="dashboard-section">
        <button onClick={toggleDashboard} className="dashboard-btn">
          Dashboard
        </button>

        {dashboardOpen && (
          <div className="dashboard-dropdown">
            <Dashboard />
          </div>
        )}
      </div>

    </div>
  );
}

export default Navbar;