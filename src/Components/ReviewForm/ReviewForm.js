import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null); // Tracks which doctor is being reviewed
  
  // Stores reviews by doctor ID: { 1: {name, review, rating}, 2: {...} }
  const [reviews, setReviews] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0
  });

  const handleButtonClick = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setShowForm(true);
    // Reset form for the new review
    setFormData({ name: '', review: '', rating: 0 });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (newRating) => {
    setFormData({ ...formData, rating: newRating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // SCENARIO 2: Validation check for name, review length, and rating
    if (formData.name && formData.review.trim().length > 2 && formData.rating > 0) {
      setReviews({ ...reviews, [selectedDoctorId]: formData });
      
      setShowForm(false);
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };

  const doctorData = [
    { id: 1, name: "Dr. Michael Doe", speciality: "Cardiology" },
    { id: 2, name: "Dr. John Kadiri", speciality: "Urology" },
    { id: 3, name: "Dr. Sarah Jenkins", speciality: "Dermatology" },
    { id: 4, name: "Dr. Amit Puri", speciality: "Neurology" }
  ];

  return (
    <div className="review-form-container">
      <h2>Give Your Feedback</h2>
      
      <table className="review-table">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Review</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {doctorData.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.name}</td>
              <td>{doc.speciality}</td>
              <td>
                <button 
                  className="btn-primary" 
                  onClick={() => handleButtonClick(doc.id)} 
                  disabled={!!reviews[doc.id]} // Button disables only for THIS doctor
                  style={{ backgroundColor: reviews[doc.id] ? 'grey' : '#007bff' }}
                >
                  {reviews[doc.id] ? 'Review Submitted' : 'Click Here'}
                </button>
              </td>
              <td>
                {reviews[doc.id] && (
                  <div className="submitted-review">
                    <p><strong>{reviews[doc.id].name}:</strong> {reviews[doc.id].review}</p>
                    <p>Rating: {"★".repeat(reviews[doc.id].rating)}</p>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <form className="feedback-form" onSubmit={handleSubmit}>
          <h3>Feedback Form for {doctorData.find(d => d.id === selectedDoctorId)?.name}</h3>
          {showWarning && <p className="warning" style={{color: 'red'}}>Please fill out all fields and provide a rating.</p>}
          
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div>
            <label>Review:</label>
            <textarea name="review" value={formData.review} onChange={handleChange} required />
          </div>

          <div className="star-rating">
            <label>Rating:</label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  className={star <= formData.rating ? "star-active" : "star-inactive"}
                  onClick={() => handleRatingChange(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;