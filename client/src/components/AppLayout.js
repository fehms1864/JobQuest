// src/components/AppLayout.js
import React from 'react';
import Header from './Header';
import '../styles/AppLayout.less';

const AppLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      <div className="content">
        {children}
      </div>
      <footer className="footer">
        <div>My Profile</div>
        <div>JobTrack Community</div>
        <div>Connect with us</div>
      </footer>
    </div>
  );
};

export default AppLayout;
