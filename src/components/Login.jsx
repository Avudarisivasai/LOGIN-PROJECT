// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../src/app.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };
const handleSubmit = e => {
  e.preventDefault();

  // Check if the entered email and password match the hardcoded values
  if (email === "super.admin@fmcg.test" && password === "Pass@1234") {
    // If credentials are correct, set token and full name to localStorage
    localStorage.setItem("authToken", "mockedToken");
    localStorage.setItem("fullName", "Super Admin");

    // Use geolocation to store position (optional)
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      localStorage.setItem(
        "geolocation",
        JSON.stringify({ latitude, longitude })
      );
    });

    // Navigate to the dashboard
    navigate("/dashboard");
  } else {
    setError("Invalid email or password.");
  }
};

    

    return (
      <div className="login-container">
            <div className="login-box">
                <img src="./logo1.png" alt="" />
          <h1>Login</h1>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>

        <div className="image-box">
          <img src="./logo.png" alt="Login logo" />
        </div>
      </div>
    );
};

export default Login;
