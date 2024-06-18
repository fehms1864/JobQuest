// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import AddJobPage from './components/AddJobPage';
import './styles/App.less';

const App = () => {
  const [jobs, setJobs] = useState([]);

  const addJob = (job) => {
    setJobs([...jobs, job]);
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter((_, index) => index !== id));
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage jobs={jobs} deleteJob={deleteJob} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add-job" element={<AddJobPage addJob={addJob} />} />
      </Routes>
    </div>
  );
};

export default App;
