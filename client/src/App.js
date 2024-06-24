import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddJobPage from './components/AddJobPage';
import Header from './components/Header';
import ModalLayout from './components/ModalLayout';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import './styles/App.less';
import ComingSoonPage from './components/ComingSoonPage';
import Cookies from 'js-cookie';

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(false);
  };

  const toggleLogin = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };

  const toggleSignUp = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  const signOut = () => {
    Cookies.remove('token');
    window.location.reload();
  }

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('token');

      if (token) {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user`, {
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            Cookies.remove('token');
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          Cookies.remove('token');
        }
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="App">
      <Header user={user} toggleLogin={toggleLogin} signOut={signOut} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-job" element={<AddJobPage />} />
        <Route path="/community" element={<ComingSoonPage />} />
        <Route path="/connect" element={<ComingSoonPage />} />
      </Routes>
      
      <ModalLayout show={isLoginOpen} onHide={closeModals}>
        <LoginPage onClose={closeModals} toggleSignUp={toggleSignUp} />
      </ModalLayout>

      <ModalLayout show={isSignUpOpen} onHide={closeModals}>
        <SignUpPage onClose={closeModals} toggleLogin={toggleLogin} />
      </ModalLayout>
    </div>
  );
};

export default App;
