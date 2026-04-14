import React from "react";
import "./Component/Style/Contact.css";

function Contact() {
  return (
    <div className="contact-container">

      {/* HERO */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you. Let’s plan your next journey ✈️</p>
      </section>

      {/* MAIN */}
      <section className="contact-main">

        {/* LEFT - INFO */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Reach out to us anytime. We’re here to help you plan your dream trip.</p>

          <div className="info-box">
            <h3>📍 Address</h3>
            <p>Bangalore, India</p>
          </div>

          <div className="info-box">
            <h3>📞 Phone</h3>
            <p>+91 7676606200</p>
          </div>

          <div className="info-box">
            <h3>📧 Email</h3>
            <p>support@mattrixtravels.com</p>
          </div>

          <div className="info-box">
            <h3>⏰ Working Hours</h3>
            <p>Mon - Sun : 9:00 AM - 9:00 PM</p>
          </div>
        </div>

        {/* RIGHT - FORM */}
        <div className="contact-form">
          <h2>Send a Message</h2>

          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your Message..." rows="5"></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>

      </section>

      {/* MAP (optional iframe) */}
      {/* <section className="map-section">
        <iframe
          title="map"
          src="https://maps.google.com/maps?q=bangalore&t=&z=13&ie=UTF8&iwloc=&output=embed"
          frameBorder="0"
          allowFullScreen=""
        ></iframe>
      </section> */}

    </div>
  );
}

export default Contact;