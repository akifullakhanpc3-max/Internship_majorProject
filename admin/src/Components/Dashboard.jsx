import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import user from '../assets/icons/user.png';
import Booking from '../assets/icons/reservation-table.png';
import revenue from '../assets/icons/revenue-growth.png';
import pending from '../assets/icons/pending.png';
import axios from 'axios';

function Dashboard() {
  const [data, setData] = useState([])
  const url = process.env.REACT_APP_SERVER_URL

  useEffect(() => {
    async function getdata() {
      try {
        const isAmount = await axios.put(`${url}/amount`)
        if (isAmount.data.success) {
          console.log("amount updated")
        }
        const response = await axios.get(`${url}/get-dashboard`);
        // console.log(response.data)
        if (response.data.success) {
          setData(response.data.data[0])
        } else {
          alert("noo data")
        }
      } catch (error) {
        console.log("interval server error");
      }
    }
    getdata()

  }, [])
  // console.log(data)

  return (

    <div>
      <div className="dashboard-container">
        <h1>Dashboard</h1>
      </div>
      <div className="catlogue"></div>
      <div className="catlogue">
        <div className="catlogue-items" style={{ background: ' linear-gradient(135deg, #52c234, #061706)' }}>
          <div className='icon'>
            <img src={Booking} alt="Booking-icon" />
          </div>
          <div className='catlogue-data'>
            <h3>Total Bookings</h3>
            <p>{data.orders}</p>
          </div>
        </div>
        <div className="catlogue-items" style={{ background: ' linear-gradient(135deg, #fe8c00, #f83600)' }}>
          <div className='icon'>
            <img src={revenue} alt="revenue-icon" />
          </div>
          <div className='catlogue-data'>
            <h3>Total Revenue</h3>
            <p>₹{data.revenue}</p>
          </div>
        </div>
        <div className="catlogue-items" style={{ background: ' linear-gradient(135deg, #f00000 , #dc281e)' }}>
          <div className='icon'><img src={pending} alt="booking-icon" /></div>
          <div className='catlogue-data'>
            <h3>Pending Payments</h3>
            <p>{data.pending}</p>
          </div>
        </div>
        <div className="catlogue-items" style={{ background: ' linear-gradient(135deg, #0575E6,#021B79 )' }}>
          <div className='icon'>
            <img src={user} alt="user-icon" />
          </div>
          <div className='catlogue-data'>
            <h3>Users</h3>
            <p>{data.users}</p>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Dashboard
