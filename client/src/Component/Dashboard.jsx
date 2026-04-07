import React from 'react';
import './Style/Dashboard.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Dashboard() {
    
    return (
        <div className='dashboard'>
            <button onClick={() => { window.location.href = '/orders' }}>Orders</button>
            <button onClick={() => { window.location.href = '/cart' }}><ShoppingCartIcon /> Cart</button>
            <button onClick={() => { localStorage.removeItem('userId') }}>Logout</button>
        </div>
    )
}

export default Dashboard
