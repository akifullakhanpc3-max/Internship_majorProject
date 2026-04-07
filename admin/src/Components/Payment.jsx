import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Payment.css';

function Payment() {
  const url = process.env.REACT_APP_SERVER_URL;
  const [data, setData] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  // 🔽 Fetch Orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/get-orders`);
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔘 Open Modal
  const openConfirm = (id, status) => {
    setSelectedId(id);
    setSelectedStatus(status);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // ✅ Confirm Action
  const handleConfirm = async () => {
    try {
      await axios.put(`${url}/update-payment/${selectedId}`, {
        status: selectedStatus,
      });

      await fetchOrders();
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="payment-wrapper">

      {/* 🔶 Pending */}
      <div className="payment-pending">
        <h1>Payment Pending</h1>

        <div className="payment-card-container">
          {data
            .filter((item) => item.PaymentStatus === false)
            .map((item) => (
              <div key={item._id} className="payment-card">

                <img src="https://picsum.photos/250/140" alt="img" />

                <div className="payment-card-content">
                  <p><b>User:</b> {item.userId}</p>
                  <p><b>Package:</b> {item.PackageName}</p>

                  <p>
                    <b>Status:</b>{" "}
                    <span className="payment-status pending">Pending</span>
                  </p>

                  <button
                    className="payment-confirm-btn"
                    onClick={() => openConfirm(item._id, true)}
                  >
                    Confirm Payment
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* 🟢 Paid */}
      <div className="payment-success">
        <h1>Payment Done</h1>

        <div className="payment-card-container">
          {data
            .filter((item) => item.PaymentStatus === true)
            .map((item) => (
              <div key={item._id} className="payment-card">

                <img src="https://picsum.photos/250/140" alt="img" />

                <div className="payment-card-content">
                  <p><b>User:</b> {item.userId}</p>
                  <p><b>Package:</b> {item.PackageName}</p>

                  <p>
                    <b>Status:</b>{" "}
                    <span className="payment-status success">Paid</span>
                  </p>

                  <p className="payment-paid-badge">Paid</p>

                  <button
                    className="payment-revert-btn"
                    onClick={() => openConfirm(item._id, false)}
                  >
                    Revert Payment
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* 🔥 Modal */}
      {showModal && (
        <div className="payment-modal-overlay">
          <div className="payment-modal-box">
            <h2>Confirm Action</h2>

            <p>
              {selectedStatus
                ? "Confirm payment?"
                : "Revert payment?"}
            </p>

            <div className="payment-modal-actions">
              <button className="payment-cancel-btn" onClick={closeModal}>
                Cancel
              </button>

              <button className="payment-confirm-btn" onClick={handleConfirm}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Payment;