import React, { useEffect, useState } from 'react';
import Loading from './Loading.jsx';
import './Style/Orders.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Orders() {
  const url = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const id = 123;
  // const id = localStorage.getItem('userId');

  useEffect(() => {
    async function getOrders() {
      try {
        setLoading(true);

        const response = await Axios.get(`${url}/get-userorders/${id}`);

        if (response.status === 200) {
          setOrders(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    }

    getOrders();
  }, [url, id]);

  async function handeldelete(id) {
    try {
      setLoading(true);
      const response = await Axios.delete(`${url}/delete-order/${id}`);
      if (response.status === 200) {
        setLoading(false);
        setOrders(orders.filter(order => order._id !== id));
      }
    } catch (error) {

    }
  }
  // const laa='69c451ec433a1a7ff3f03840'
  // handelnavigate(laa)
  async function handelnavigate(id){
    navigate(`/packages/${id}`);
  }
  return (
    <div className={loading ? "ifLoading" : "orders-container"}>

      {loading ? (
        <Loading />
      ) : (
        <div>
          {orders.length > 0 ? (
            orders.map((item) => (
              <div onclick={handelnavigate(item._packageId)} className="order" key={item._packageId}>
                <p>
                  Product Name: <span>{item.PackageName}</span>
                </p>
                <p>
                  Price / person: <span>${item.pricePerPerson}</span>
                </p>
                <p>
                  Quantity: <span>{item.person}</span>
                </p>
                <p>
                  Total Amount:{" "}
                  <span>${item.totalAmount * item.person}</span>
                </p>
                <button onclick={
                  handeldelete(item._id)
                }>Delete Order</button>
              </div>
            ))
          ) : (
            <h1 className="noOrders">No Orders Yet</h1>
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;