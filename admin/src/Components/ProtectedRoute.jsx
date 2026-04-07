import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null);
  const url = "http://localhost:5000";

  useEffect(() => {
    const checkUser = async () => {
      const username = localStorage.getItem("username");

      if (!username) {
        setIsValid(false);
        return;
      }

      try {
        const res = await axios.get(`${url}/get-admin`, {
          params: { username }
        });

        if (res.data.success) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }

      } catch (err) {
        setIsValid(false);
      }
    };

    checkUser();
  }, []);

  // ⏳ Loading state
  if (isValid === null) {
    return <p style={{color:"white"}}>Checking authentication...</p>;
  }

  // ❌ Not valid → redirect
  if (!isValid) {
    return <Navigate to="/login" />;
  }

  // ✅ Valid → allow access
  return children;
}

export default ProtectedRoute;