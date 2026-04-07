import React from 'react';
import {NavLink} from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Style/Navbar.css';

function Navbar() {
  return (
    <div className='navbar'>
        <div>
            <img src="./lala" alt="Logo" />
        </div>
        <div className='nav-links'>
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
            
            <NavLink className={({isActive})=> isActive?"active":""} to="/packages">Packages</NavLink>
            <NavLink className={({isActive})=> isActive?"active":""} to="/orders">Orders</NavLink>
            <NavLink className={({isActive})=> isActive?"active":""} to="/cart"><ShoppingCartIcon/></NavLink>
            
        </div>
        <div>
        <NavLink className={({isActive})=> isActive?"active":""} to="/dashboard">Dashboard</NavLink>
        </div>
    </div>
  )
}

export default Navbar