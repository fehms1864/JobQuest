import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppLayout from './AppLayout';
import '../styles/AddJobPage.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

const AddJobPage = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const [job, setJob] = useState({
    title: '',
    companyName: '',
    salary: '',
    description: '',
    link: '',
    status: '',
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = Cookies.get('token');

    fetch('http://localhost:3000/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(job)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Something went wrong with the Error Please Try again!');
        }
        return response.json();
      })
      .then(data => {
        console.log('Job application added:', data);
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
          navigate('/');
        }, 5000);
      })
      .catch(error => {
        console.error('Error adding job application:', error);
        setErrorVisible(true);
          setTimeout(() => {
            setErrorVisible(false);
          }, 5000);
      });

  };

  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="add-job-page">
      {alertVisible && (
          <div className="alert alert-success" role="alert">
            Job application added successfully!
          </div>
        )}
        {errorVisible && (
          <div className="alert alert-danger" role="alert">
            Something went wrong! Please make sure you are logged in or refresh and try again!
          </div>
        )}
        <div className="hero-section">
          <Link to="/" className="btn btn-outline-primary back-button">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back
          </Link>
          <h2>Job Application Record</h2>
        </div>

        <div className="add-job-container">
          <form onSubmit={handleSubmit}>
            <div className="job-details">
              <h3>Job details</h3>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={job.title}
                  onChange={handleChange}
                  placeholder="Position"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="companyName"
                  value={job.companyName}
                  onChange={handleChange}
                  placeholder="Company Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  name="salary"
                  value={job.salary}
                  onChange={handleChange}
                  placeholder="Salary Offered"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  name="description"
                  value={job.description ?? "N/A"}
                  onChange={handleChange}
                  placeholder="Job Description"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="link"
                  value={job.link}
                  onChange={handleChange}
                  placeholder="Job Link"
                  required
                />
              </div>
              <div className="form-group">
                <select
                  id="statusSelect"
                  className="custom-select"
                  name="status"
                  value={job.status}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Job Status</option>
                  <option value="Applied">Applied</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Offer Received">Offer Received</option>
                  <option value="Accepted">Accepted</option>
                </select>
              </div>
              <button type="submit" className="btn btn-success add-button">Add</button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default AddJobPage;