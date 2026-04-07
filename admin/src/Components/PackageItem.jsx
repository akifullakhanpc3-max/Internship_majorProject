import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PackageItem.css';
import axios from 'axios';

/* ================= UPDATE COMPONENT ================= */
function UpdatePackage({ show, close, data, setData }) {
  const navigate = useNavigate();
  const url = process.env.REACT_APP_SERVER_URL;
  const { id } = useParams();
  const [formData, setFormData] = useState(data || {});

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.put(`${url}/update-package`, formData);

      if (res.data.success) {
        alert("Updated successfully ✅");
        // If backend returns "package" or "data", pick whichever exists
        setData(res.data.data || res.data.package || formData);
        navigate(`/package/${id}`);
        close();
      } else {
        alert("Update failed ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }
  }

  if (!show) return null;

  return (
    <div className="confirm-overlay">
      <form className="update-form" onSubmit={handleSubmit}>
        <div className="close" onClick={close}>X</div>

        <h2>Update Package</h2>

        <label>Package Name</label>
        <input name="name" value={formData?.name || ""} onChange={handleChange} />

        <label>Price</label>
        <input name="price" type='number' value={formData?.price || ""} onChange={handleChange} />

        <label>Description</label>
        <textarea name="description" value={formData?.description || ""} onChange={handleChange} />

        <label>Days</label>
        <input name="days" type='number' value={formData?.days || ""} onChange={handleChange} />

        <label>Image URL</label>
        <input
          name="image"
          value={formData?.image || formData?.imageUrl || ""}
          onChange={handleChange}
        />

        <button type="submit">Update Package</button>
      </form>
    </div>
  );
}

/* ================= MAIN COMPONENT ================= */
function PackageItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const url = process.env.REACT_APP_SERVER_URL;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showUpdate, setShowUpdate] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  /* ================= FETCH ================= */
  useEffect(() => {
    async function getdata() {
      try {
        const res = await axios.post(`${url}/get-package-details`, { id });
        console.log('API response:', res.data); // debug

        // Use either 'data' or 'package' depending on backend
        const packageData = res.data.data || res.data.package;

        if (res.data.success && packageData) {
          setData(packageData);
        } else {
          setError("Package not found");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    if (id) getdata();
  }, [id, url]);

  /* ================= DELETE ================= */
  async function handleDelete() {
    try {
      const res = await axios.delete(`${url}/delete-package/${id}`);
      if (res.data.success) {
        alert("Deleted ✅");
        setShowConfirm(false);
        navigate('/package');
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed ❌");
    }
  }

  /* ================= UI STATES ================= */
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!data) return <h2>No data found</h2>;

  return (
    <div className='all'>

      {/* ================= CARD ================= */}
      <div className='indivisual-package'>
        <div className="container">

          <div className="package-image">
            <img
              src={data?.image || data?.imageUrl || ""}
              alt={data?.name || "Package"}
            />
          </div>

          <div className='details'>
            <div className="update">
              <button onClick={() => setShowUpdate(true)}>Update</button>
              <button onClick={() => setShowConfirm(true)}>Delete</button>
            </div>

            <div className="info">
              <h2>Packages: {data?.name || "-"}</h2>
              <h3>{data?.days || "-"} Days</h3>
              <p><strong>Price:</strong> ₹{data?.price || "-"}</p>
              <p>Description:</p>
              <p>&ensp;&ensp;&ensp;&ensp;{data?.description || "-"}</p>
            </div>
          </div>

        </div>
      </div>

      {/* ================= UPDATE MODAL ================= */}
      <UpdatePackage
        show={showUpdate}
        close={() => setShowUpdate(false)}
        data={data}
        setData={setData}
      />

      {/* ================= DELETE CONFIRM ================= */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <p>Delete this package?</p>

            <div>
              <button onClick={handleDelete}>Yes</button>
              <button onClick={() => setShowConfirm(false)}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DEBUG ================= */}
      <pre style={{ display: 'none' }}>{JSON.stringify(data, null, 2)}</pre>

    </div>
  );
}

export default PackageItem;