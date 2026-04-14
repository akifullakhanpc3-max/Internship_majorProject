import React, { useEffect, useState } from "react";
import Loading from "./Loading.jsx";
import "./Style/Orders.css";
import axios from "axios";

function Orders() {
  const userId = localStorage.getItem("userId");
  const url = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await axios.get(`${url}/get-userorders/${userId}`);

        console.log("Orders Response:", response.data);

        if (response.status === 200 && response.data.success) {
          setOrders(response.data.data);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    getOrders();
  }, [url, userId]);

  // ✅ AFTER hooks (safe)
  if (!userId) {
    return <h2>Please login first 🔐</h2>;
  }

  return (
    <div className={loading ? "ifLoading" : "orders-container"}>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1 className="orders-title">My Orders 📦</h1>

          {orders.length > 0 ? (
            orders.map((item) => (
              <div className="order-card" key={item._id}>
                <h2>{item.PackageName}</h2>

                <p>👤 Name: <span>{item.customerName}</span></p>
                <p>👥 People: <span>{item.NumberofPeople}</span></p>
                <p>📅 Travel Date: <span>{item.TravelDate}</span></p>

                <p>💰 Price / Person: <span>₹ {item.pricePerPerson}</span></p>

                <p>
                  💵 Total:
                  <span>
                    ₹ {item.pricePerPerson * item.NumberofPeople}
                  </span>
                </p>

                <p>📦 Status: <span>{item.Status}</span></p>

                <p>
                  💳 Payment:
                  <span>
                    {item.PaymentStatus ? " Paid ✅" : " Pending ⏳"}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <h1 className="noOrders">No Orders Yet 😔</h1>
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;