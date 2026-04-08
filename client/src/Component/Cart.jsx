import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

 useEffect(() => {
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("Cart Data:", storedCart); // 👈 ADD THIS
  setCart(storedCart);
}, []);

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleCheckout = (item) => {
    navigate(`/package/${item._id}`);
  };

  const totalAmount = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart-container">
      <h1 className="cart-title">My Cart 🛒</h1>

      {cart.length === 0 ? (
        <h2 className="empty-cart">Your cart is empty 😔</h2>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item, index) => (
              <div className="cart-card" key={index}>
                <img src={item.image} alt={item.name} />

                <div className="cart-info">
                  <h2>{item.name}</h2>
                  <p>₹ {item.price}</p>
                  <p>{item.days} Days</p>

                  <div className="cart-actions">
                    <button
                      className="book-btn"
                      onClick={() => handleCheckout(item)}
                    >
                      Book Now
                    </button>

                    <button
                      className="remove-btn"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h2>Total: ₹ {totalAmount}</h2>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;