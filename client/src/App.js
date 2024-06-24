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

  const VerificationPage = () => {
    useEffect(() => {
      const downloadFile = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/.well-known/pki-validation/E8F060FE1532B446A56745B89BAF711F.txt`);
          if (response.ok) {
            const text = await response.text();
          const blob = new Blob([text], { type: 'text/plain' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a'); 
          link.href = url; 
          link.setAttribute('download', 'verification.txt'); 
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          } else {
            console.error('Failed to verify:', response.status);
          }
        } catch (error) {
          console.error('Error fetching verification file:', error);
        }
      };
  
      downloadFile();
    }, []);
  
    return (
      <div>
        <h1>Verification Page</h1>
      </div>
    );
  };

  return (
    <div className="App">
      <Header user={user} toggleLogin={toggleLogin} signOut={signOut} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-job" element={<AddJobPage />} />
        <Route path="/community" element={<ComingSoonPage />} />
        <Route path="/connect" element={<ComingSoonPage />} />
        <Route path="/.well-known/pki-validation/E8F060FE1532B446A56745B89BAF711F.txt" element={<VerificationPage />} /> 
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
