import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/Dashboard.css";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const toggleMenu = () => setOpen(!open);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.reload();
    navigate("/");
  };

  /* close when clicking outside */
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="dashboard-dropdown" ref={dropdownRef}>
      {/* Toggle Button */}
      <button className="menu-btn" onClick={toggleMenu}>
        <MenuIcon />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="dropdown-menu">
          <button onClick={() => navigate("/orders")}>
            <ReceiptLongIcon className="icon" />
            Orders
          </button>

          <button onClick={() => navigate("/cart")}>
            <ShoppingCartIcon className="icon" />
            Cart
          </button>

          <button className="logout" onClick={handleLogout}>
            <LogoutIcon className="icon" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;