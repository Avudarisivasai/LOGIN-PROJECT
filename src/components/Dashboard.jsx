import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import "./Dash.css"; // Import the new CSS file for the design

const Dashboard = () => {
  const [brands, setBrands] = useState([]);
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/");
      return;
    }

    const storedFullName = localStorage.getItem("fullName");
    setFullName(storedFullName);

    fetchBrands(token);
  }, [navigate]);

  const fetchBrands = async token => {
    try {
      const response = await fetch(
        "https://fmcg.perisync.work/api/brand?skip=1&limit=10",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setBrands(data.brands || []);
      } else {
        setError(data.message || "Error fetching brands.");
      }
    } catch (err) {
      setError("Failed to fetch brands.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard-page">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Admin Dashboard</h1>
        </div>
        <div className="header-right">
          <p>Welcome, {fullName}</p>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-content">
        <h2>Your Brands</h2>
        {error && <p className="error-message">{error}</p>}
        <ul className="brand-list">
          {brands.length > 0 ? (
            brands.map((brand, index) => (
              <li key={index} className="brand-item">
                {brand.name}
              </li>
            ))
          ) : (
            <li className="brand-item">Filuick</li>
          )}
        </ul>
      </main>

      {/* Footer Section */}
      <footer className="dashboard-footer">
        <p>© 2024 Filuick pay. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
