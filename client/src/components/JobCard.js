import React from 'react';
import '../styles/JobCard.less';

const JobCard = ({ id, title, companyName, salary, status, description, onDelete, onStatusChange }) => {

  const getStatusClass = (status) => {
    switch (status) {
      case 'Applied':
        return 'status-applied';
      case 'Rejected':
        return 'status-rejected';
      case 'Interviewing':
        return 'status-interviewing';
      case 'Offer Received':
        return 'status-offer-received';
      case 'Accepted':
        return 'status-accepted';
      default:
        return '';
    }
  };

  return (
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-2 d-flex align-items-center justify-content-center">
            <img src="../../jobCardLogo.jpeg" className="card-img" alt="Job Placeholder" />
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
                className={`form-select mb-2 ${getStatusClass(status)}`}
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

          <div className="col-md-1 d-flex align-items-center justify-content-center">
              <button onClick={() => onDelete(id)} className="btn btn-danger">Delete</button>
          </div>

        </div>
      </div>
  );
};

export default JobCard;
