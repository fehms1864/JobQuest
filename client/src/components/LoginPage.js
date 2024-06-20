import React, { useState } from 'react';
import Cookies from 'js-cookie';
import '../styles/LoginPage.less';

const LoginPage = ({ onClose, toggleSignUp, setUser }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.username,
          password: credentials.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Cookies.set('token', data.token, { expires: 1 }); // Token will expire in 1 day
        onClose();
        window.location.reload();
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container container mt-2">
        <div className="row justify-content-center">
          <div className="col-md-10 col-sm-10">
          <div className="text-center mb-4">
              <i className="fas fa-briefcase fa-3x"></i>
            </div>
            <h2 className="text-center mb-3">Login to JobQuest</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-2">
                <label htmlFor="username">User Name</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  value={credentials.username}
                  onChange={handleChange}
                  placeholder="User Name"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Log In</button>
              {error && <p className="text-danger mt-2">{error}</p>}
            </form>
            <button onClick={toggleSignUp} className="btn btn-link mt-3 d-block text-center">
              Don't have an account? Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
