import React from "react";
import './Component/Style/Aboutus.css';

function Aboutus() {
  return (
    <div className="about-container">
      
      {/* HERO SECTION */}
      <section className="about-hero">
        <h1>About Mattrix Travels</h1>
        <p>
          For over 4 years, we've been crafting extraordinary travel experiences
          that create lasting memories.
        </p>
      </section>

      {/* INTRO */}
      <section className="about-intro">
        <h2>Your Trusted Travel Partner</h2>
        <p>
          At Mattrix Travels, we believe travel is more than just visiting new
          places—it's about creating transformative experiences that enrich your life.
          Our passionate team has helped adventurers discover the world's most incredible destinations.
        </p>

        <p>
          We specialize in crafting personalized travel experiences that cater to your
          unique interests, preferences, and budget. From luxury honeymoons to
          adventurous expeditions, we handle every detail so you can focus on making memories.
        </p>

        <ul className="features">
          <li>✔ Personalized Service</li>
          <li>✔ 24/7 Support</li>
          <li>✔ Best Price Guarantee</li>
        </ul>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stat-box">
          <h3>4+</h3>
          <p>Years of Excellence</p>
        </div>

        <div className="stat-box">
          <h3>5K+</h3>
          <p>Happy Travelers</p>
        </div>

        <div className="stat-box">
          <h3>50+</h3>
          <p>Destinations</p>
        </div>

        <div className="stat-box">
          <h3>4.9/5</h3>
          <p>Customer Rating</p>
        </div>
      </section>

      {/* WHY US */}
      <section className="why-us">
        <h2>Why Travel With Us?</h2>

        <div className="why-grid">
          <div className="why-card">
            <h3>🎒 Expert Local Guides</h3>
            <p>Travel with seasoned professionals for immersive, safe experiences.</p>
          </div>

          <div className="why-card">
            <h3>📝 Personalized Itineraries</h3>
            <p>Every journey is tailored for your tastes and travel style.</p>
          </div>

          <div className="why-card">
            <h3>⏰ 24x7 Support</h3>
            <p>We're always available for assistance, wherever you are.</p>
          </div>

          <div className="why-card">
            <h3>🌟 Trusted by Travelers</h3>
            <p>Our customer stories speak for themselves – satisfaction guaranteed.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Aboutus;