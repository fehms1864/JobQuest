// src/components/HomePage.js
import React from 'react';
import AppLayout from './AppLayout';
import JobCard from './JobCard';
import '../styles/HomePage.less';

const HomePage = ({ jobs = [], deleteJob }) => {
  return (
    <AppLayout>
      <div className="home-page">
        <div className="hero-section">
          <h1>JobQuest</h1>
          <p>Organize job details and track application status</p>
        </div>
        <div className="job-list">
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <JobCard
                key={index}
                id={index}
                title={job.companyName}
                description={job.description}
                images={job.images}
                onDelete={deleteJob}
              />
            ))
          ) : (
            <p>No jobs added yet.</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;
