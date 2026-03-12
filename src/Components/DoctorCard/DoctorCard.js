import React, { useState } from 'react';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import './DoctorCard.css';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showForm, setShowForm] = useState(false);
  const [appointment, setAppointment] = useState(null); 

  // 1. Logic for Booking
  const handleBooking = (appointmentData) => {
    // Save to local storage so Notification component can see it
    localStorage.setItem('doctorData', JSON.stringify({ name, speciality }));
    localStorage.setItem('appointmentData', JSON.stringify(appointmentData));
    
    // Trigger the notification update immediately
    window.dispatchEvent(new Event('storage'));

    setAppointment(appointmentData);
    setShowForm(false);
  };

  // 2. Logic for Canceling
  const handleCancel = () => {
    // Clear storage
    localStorage.removeItem('appointmentData');
    localStorage.removeItem('doctorData');
    
    // Inform the notification to disappear
    window.dispatchEvent(new Event('storage'));

    setAppointment(null); 
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image">
           <img src={profilePic} alt={name} className="doctor-img" />
        </div>
        <div className="doctor-card-info">
          <h2 className="doctor-card-name">{name}</h2>
          <p className="doctor-card-speciality">{speciality}</p>
          <p className="doctor-card-experience">{experience} years experience</p>
          <div className="doctor-card-ratings">
            <span className="stars">{"★".repeat(Math.floor(ratings))}</span>
            <span>({ratings})</span>
          </div>
        </div>
      </div>

      <div className="doctor-card-options-container">
        {appointment ? (
          <div className="booked-info">
            <p><strong>Patient:</strong> {appointment.name}</p>
            <p><strong>Date:</strong> {appointment.selectedDate}</p>
            <p><strong>Time:</strong> {appointment.selectedSlot}</p>
            <button className="cancel-appointment-btn" onClick={handleCancel}>
              Cancel Appointment
            </button>
          </div>
        ) : (
          <>
            {!showForm ? (
              <button className="book-appointment-btn" onClick={() => setShowForm(true)}>
                <div>Book Appointment</div>
                <div>No Booking Fee</div>
              </button>
            ) : (
              <AppointmentForm 
                doctorName={name} 
                onSubmit={handleBooking} 
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;