import React, {useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import JobCard from '../components/JobCard';
import Cookies from 'js-cookie';
import '../styles/HomePage.less';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('All');
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchJobs = async () => {
      if (!token) {
        return;
      }
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/applications`, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        } else {
          console.error('Failed to fetch job applications:', response.statusText);

        }
      } catch (error) {
        console.error('Error fetching job applications:', error);

      }
    };

    fetchJobs();
  }, [token]);

  const handleStatusChange = async (id, newStatus) => {
    console.log('id', id)
    console.log('newStatus', newStatus)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/applications/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
  
      if (response.ok) {
        await response.json();
        const updatedJobs = jobs.map((job) => {
          if (job._id === id) {
            return { ...job, status: newStatus };
          }
          return job;
        });
        setJobs(updatedJobs);

      } else {
        console.error('Failed to update job status');
      }
    } catch (error) {
      console.error('Error updating job status:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/applications/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });
      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Failed to delete job application record');
      }
    } catch (error) {
      console.error('Error deleting job application record:', error);
    }
  }

  const filteredJobs = filter === 'All' ? jobs : jobs.filter((job) => job.status === filter);


  return (
    <AppLayout>
      <div className="home-page">
        <div className="hero-section">
          <h1>JobQuest</h1>
          <p>A place to keep job application records and update record status</p>
        </div>
        <div className='container'>
        {token != null ? <div className="filter-buttons mb-3">
          <div className="btn-group flex-wrap" role="group" aria-label="Filter jobs by status">
            <button type="button" className={`btn btn-outline-primary ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All</button>
            <button type="button" className={`btn btn-outline-primary ${filter === 'Applied' ? 'active' : ''}`} onClick={() => setFilter('Applied')}>Applied</button>
            <button type="button" className={`btn btn-outline-danger ${filter === 'Rejected' ? 'active' : ''}`} onClick={() => setFilter('Rejected')}>Rejected</button>
            <button type="button" className={`btn btn-outline-warning ${filter === 'Interviewing' ? 'active' : ''}`} onClick={() => setFilter('Interviewing')}>Interviewing</button>
            <button type="button" className={`btn btn-outline-success ${filter === 'Offer Received' ? 'active' : ''}`} onClick={() => setFilter('Offer Received')}>Offer Received</button>
            <button type="button" className={`btn btn-outline-info ${filter === 'Accepted' ? 'active' : ''}`} onClick={() => setFilter('Accepted')}>Accepted</button>
          </div>
        </div> : null}
        <div className="job-list">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <JobCard
                key={index}
                id={job._id}
                title={job.title}
                companyName={job.companyName}
                salary={job.salary}
                status={job.status}
                link={job.link}
                description={job.description}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : filteredJobs.length === 0 && token != null ?
            (<p>No job records available for this filter</p>)
           : (
            <p>No job records added yet. Please Login or Sign Up to start!</p>
          )}
        </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;
