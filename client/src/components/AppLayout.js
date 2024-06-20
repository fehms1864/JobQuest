import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AppLayout.less';

const AppLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <div className="content">
        {children}
      </div>
      <footer className="footer">
        <div><Link className='link-no-underline' to='/community'>JobQuest Community</Link></div>
        <div><Link className='link-no-underline' to='/connect'>Connect with us</Link></div>
      </footer>
    </div>
  );
};

export default AppLayout;
