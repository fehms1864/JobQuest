// src/components/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppLayout from './AppLayout';
import '../styles/LoginPage.less';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming login is successful, navigate to the home page
    // You can add your login logic here and check for authentication
    if (credentials.username === 'user' && credentials.password === 'password') {
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <AppLayout>
      <div className="login-page">
        <div className="hero-section">
          <h1>Lorem Ipsum</h1>
          <p>Organize job details and track application status</p>
        </div>
        <div className="login-container">
          <Link to="/" className="back-button">Back</Link>
          <h2>Login to JobQuest</h2>
          <div className="login-icon">
            <img src="../styles/login_icon.jpeg" alt="Login Icon" />
          </div>
          <h3>Log In</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="User Name"
            />
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <button type="submit" className="login-button">Log In</button>
            <button type="button" className="signup-button">Sign Up</button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default LoginPage;
