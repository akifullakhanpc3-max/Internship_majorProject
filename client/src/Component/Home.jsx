import React from "react";
import "./Style/Home.css";
import bg from "../assects/images/wallpaperswide.com-sexten-dolomites-hiking-trail-landscape-wallpaper-3840x2160.jpg";

function Home() {
  const service = [
    {
      icon: "✈️",
      title: "Flight Bookings",
      description:
        "Find and book the best flights worldwide with exclusive deals and flexible options.",
      features: [
        "Global Airlines",
        "Best Prices",
        "Flexible Dates",
        "24/7 Support",
      ],
    },
    {
      icon: "🏩",
      title: "Hotel Reservations",
      description:
        "Luxury accommodations and budget-friendly stays in prime locations worldwide.",
      features: [
        "Premium Hotels",
        "Best Locations",
        "Instant Booking",
        "Special Rates",
      ],
    },
    {
      icon: "📍",
      title: "Custom Tour Packages",
      description:
        "Tailored travel experiences designed to match your preferences and budget.",
      features: [
        "Personalized Tours",
        "Expert Guides",
        "Unique Experiences",
        "All-Inclusive",
      ],
    },
    {
      icon: "🚗",
      title: "Car Rentals",
      description:
        "Reliable vehicle rentals for comfortable and convenient travel at your destination.",
      features: [
        "Latest Models",
        "Competitive Rates",
        "Insurance Options",
        "Easy Pickup",
      ],
    },
    {
      icon: "⛰️",
      title: "Adventure Tours",
      description:
        "Thrilling outdoor adventures for adrenaline seekers and nature enthusiasts.",
      features: [
        "Safety First",
        "Expert Guides",
        "Quality Gear",
        "Small Groups",
      ],
    },
    {
      icon: "🧭",
      title: "Travel Consultation",
      description:
        "Expert travel advice and planning services for your perfect vacation.",
      features: [
        "Expert Advice",
        "Custom Planning",
        "Local Insights",
        "Budget Planning",
      ],
    }
  ]
  return (
    <div>

      {/* 🔝 TOP BAR */}
      {/* <div className="top-bar">
        Call for queries <br />
        <span>+91 99459 32938 | 0821-4502754</span>
      </div> */}

      {/* 🌄 HERO */}
      <div
        className="home-content"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="overlay"></div>

        <div className="hero-text">
          <h1>
            Travel Beyond Limits with <br />
            <span>Mattrix Travels</span>
          </h1>

          <p>
            Tailor-made adventures, luxury escapes, and offbeat journeys –
            explore, discover, and experience more.
          </p>

          <button className="cta-btn" onClick={()=>{
            window.location.href = "/packages";
          }}>Explore Packages</button>
        </div>
      </div>
      <h2 className="services-title">Our Services</h2>
      <div className="services-section">
        
        {service.map((item, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <ul>
              {item.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 💬 WHATSAPP BUTTON */}
      <a
        href="https://wa.me/919945932938"
        className="whatsapp-btn"
        target="_blank"
        rel="noreferrer"
      >
        💬
      </a>

    </div>
  );
}

export default Home;