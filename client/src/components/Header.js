import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.less';

const Header = ({ user, toggleLogin, signOut }) => {
  return (
    <header className="header">
      <div className="logo">
        <i className="fas fa-briefcase"></i> JobQuest
      </div>
      <nav>
        <ul>
          <li className='btn btn-outline-secondary'><Link className='link-no-underline' to="/">Home</Link></li>
          <li className='btn btn-outline-secondary'><Link className='link-no-underline' to="/add-job">Add Job</Link></li>
          <li>
            {user ? (
              <button type='button' onClick={signOut} className="btn btn-outline-secondary text-white">Sign Out, {user.name}</button>
            ) : (
              <button onClick={toggleLogin} type="button" className="btn btn-outline-secondary text-white">Sign In</button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
