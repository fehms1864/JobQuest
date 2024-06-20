import React from 'react';
import '../styles/JobCard.less';

const JobCard = ({ id, title, companyName, salary, status, link, description, onDelete, onStatusChange }) => {

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied':
        return '#007bff';
      case 'Rejected':
        return '#dc3545';
      case 'Interviewing':
        return '#ffc107';
      case 'Offer Received':
        return '#28a745'; 
      case 'Accepted':
        return '#17a2b8';
      default:
        return '#6c757d';
    }
  };

  return (
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-2 d-flex align-items-center justify-content-center job-card-img-container">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <img src="../../jobCardLogo.jpeg" className="card-img" alt="Job Placeholder" />
          </a>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="card-body text-start">
              <h5 className="card-title">{title}</h5>
              <p className="card-text"><strong>Company:</strong> {companyName}</p>
              <p className="card-text"><strong>Salary:</strong> {salary}</p>
              <p className="card-text">{description}</p>
            </div>
          </div>
          <div className="col-md-2 d-flex align-items-center justify-content-center">
              <select
                id={id}
                className='form-select'
                style={{ backgroundColor: getStatusColor(status), color: 'white', width: 'auto' }}
                value={status}
                onChange={(e) => onStatusChange(id, e.target.value)}
              >
                <option value="Applied">Applied</option>
                <option value="Rejected">Rejected</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer Received">Offer Received</option>
                <option value="Accepted">Accepted</option>
              </select>
          </div>

          <div className="col-md-2 d-flex align-items-center justify-content-center">
              <button onClick={() => onDelete(id)} className="btn btn-danger">Delete</button>
          </div>

        </div>
      </div>
  );
};

export default JobCard;
