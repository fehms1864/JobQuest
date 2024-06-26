import React, { useState } from 'react';
import '../styles/LoginPage.less';

const SignUpPage = ({ onClose, toggleLogin }) => {
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpData),
      });

      const data = await response.json();
      if (response.ok) {
        setAlertVisible(true);
        setTimeout(() => {
          onClose();
        toggleLogin();
        }, 3000)
        
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
      {alertVisible && (
          <div className="alert alert-success" role="alert">
            Successfully Signed Up! Redirecting to Login
          </div>
        )}
        <h2>Sign Up for JobQuest</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={signUpData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Full Name"
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="email"
              value={signUpData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Email"
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={signUpData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Password"
              required
              autoComplete="off"
            />
          </div>
          <button type="submit" className="btn btn-success btn-block">Sign Up</button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;