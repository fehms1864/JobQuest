// src/components/AddJobPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppLayout from './AppLayout';
import '../styles/AddJobPage.less';

const AddJobPage = ({ addJob }) => {
  const [job, setJob] = useState({
    companyName: '',
    salary: '',
    description: '',
    link: '',
    status: '',
    images: []
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setJob({ ...job, images: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addJob(job);
    navigate('/');
  };

  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="add-job-page">
        <div className="hero-section">
          <Link to="/" className="back-button">Back</Link>
          <h2>Attach job information</h2>
        </div>
        <div className="add-job-container">
          <form onSubmit={handleSubmit}>
            <div className="image-upload">
              <label htmlFor="upload">
                <img src="path/to/upload-icon.png" alt="Upload Job" />
                <input type="file" id="upload" multiple onChange={handleImageUpload} />
              </label>
              <div className="image-preview">
                {job.images.map((image, index) => (
                  <img key={index} src={URL.createObjectURL(image)} alt={`Job Image ${index + 1}`} />
                ))}
              </div>
            </div>
            <div className="job-details">
              <h3>Job details</h3>
              <input
                type="text"
                name="companyName"
                value={job.companyName}
                onChange={handleChange}
                placeholder="Company Name"
              />
              <input
                type="text"
                name="salary"
                value={job.salary}
                onChange={handleChange}
                placeholder="Salary Offered"
              />
              <textarea
                name="description"
                value={job.description}
                onChange={handleChange}
                placeholder="Job Description"
              />
              <input
                type="text"
                name="link"
                value={job.link}
                onChange={handleChange}
                placeholder="Job Link"
              />
              <input
                type="text"
                name="status"
                value={job.status}
                onChange={handleChange}
                placeholder="Job Status"
              />
              <button type="submit" className="add-button">Add</button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default AddJobPage;
