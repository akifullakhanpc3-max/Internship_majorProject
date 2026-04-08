import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Style/Packages.css";

function Packages() {
  const navigate = useNavigate();

  const [pkg, setPkg] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await axios.get(`${url}/get-package`);
        setPkg(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, [url]);

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="page-container">
        <div className="package">
          <h2 className="loading-text">Loading packages...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="package">
        {/* HEADER */}
        <div className="package-header">
          Explore Travel Packages 🌍
        </div>

        {/* LIST */}
        <div className="package-list">
          {pkg.length === 0 ? (
            <h3 className="empty-state">No packages available</h3>
          ) : (
            pkg.map((item) => (
              <div
                key={item._id}
                className="package-item"
                onClick={() => navigate(`/package/${item._id}`)}
              >
                {/* IMAGE */}
                <div className="image-wrapper">
                  <img src={item.image} alt={item.name} />
                </div>

                {/* CONTENT */}
                <div className="content">
                  <h3>{item.name}</h3>

                  {/* META INFO */}
                  <div className="meta">
                    <span className="price">₹ {item.price}</span>
                    <span className="days">{item.days} days</span>
                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent card click
                      navigate(`/package/${item._id}`);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Packages;