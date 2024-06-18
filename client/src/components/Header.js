// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.less';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">JobQuest</div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add-job">Add Job</Link></li>
          <li><Link to="/login">Sign In</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
