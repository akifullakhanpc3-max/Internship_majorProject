import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Style/PackageDetails.css";

function PackageDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [form, setForm] = useState({
    name: "",
    people: 1,
    date: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const url = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await axios.post(`${url}/get-package-details`, { id });
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchDetails();
  }, [id, url]);

  if (!data) return <h2>Loading...</h2>;

  const handleAddToCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = {
    _id: data._id,
    name: data.name,
    price: data.price,
    image: data.image,
    days: data.days
  };

  cart.push(item);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart 🛒");
};

const handleBooking = async () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Please login first");
    return;
  }

  // ✅ validation
  if (!form.name || !form.date || !form.people) {
    alert("Please fill all details");
    return;
  }

  try {
    const res = await axios.post(`${url}/create-order`, {
      PackageName: data.name,
      customerName: form.name,          // ✅ FIXED
      userId: userId,
      TravelDate: form.date,            // ✅ FIXED
      NumberofPeople: form.people,      // ✅ FIXED
      pricePerPerson: data.price
    });

    if (res.data.success) {
      alert("Booking successful 🎉");

      // ✅ optional: clear form
      setForm({
        name: "",
        people: 1,
        date: ""
      });
    }
  } catch (err) {
    console.log(err);
  }
};
  return (
    <div className="details-page">
      <div className="details-container">
        <img src={data.image} alt={data.name} className="details-image" />

        <div className="details-content">
          <h1>{data.name}</h1>

          <p className="details-price">₹ {data.price}</p>

          <p className="details-days">{data.days} Days Trip</p>

          <p className="details-desc">{data.description}</p>

          <div className="booking-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="number"
              name="people"
              placeholder="Number of People"
              // value={form.people}
              onChange={handleChange}
            />

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>
          <button className="book-btn" onClick={handleBooking}>
            Book Now
          </button>

          <button className="cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default PackageDetails;
