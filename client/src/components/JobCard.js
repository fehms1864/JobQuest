// src/components/JobCard.js
import React from 'react';
import '../styles/JobCard.less';

const JobCard = ({ id, title, description, images = [], onDelete }) => {
  return (
    <div className="job-card">
      <div className="job-card-image">
        {images.length > 0 ? (
          images.map((image, index) => (
            <img key={index} src={URL.createObjectURL(image)} alt={`Job Image ${index + 1}`} />
          ))
        ) : (
          <img src="path/to/placeholder.png" alt="Job Placeholder" />
        )}
      </div>
      <div className="job-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <button onClick={() => onDelete(id)} className="delete-button">Delete</button>
      </div>
    </div>
  );
};

export default JobCard;
