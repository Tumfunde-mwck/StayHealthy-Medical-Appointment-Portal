import React, { useEffect, useState } from 'react';
import './Notification.css'; 

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(true);

  const updateNotificationData = () => {
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail) {
      setIsLoggedIn(true);
      // REFINED: Extract name before '@' for a cleaner UI
      const nameFromEmail = storedEmail.split('@')[0];
      setUsername(nameFromEmail);
    } else {
      setIsLoggedIn(false);
    }

    // Check for appointment data
    const genericData = JSON.parse(localStorage.getItem('appointmentData'));
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const doctorSpecificData = storedDoctorData ? JSON.parse(localStorage.getItem(storedDoctorData.name)) : null;

    const finalData = genericData || doctorSpecificData;

    if (finalData) {
      setAppointmentData(finalData);
    } else {
      setAppointmentData(null);
    }
  };

  useEffect(() => {
    updateNotificationData();

    const handleStorageChange = () => {
      updateNotificationData();
      // Ensure notification pops up again if new data arrives
      setShowNotification(true); 
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('appointmentUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('appointmentUpdated', handleStorageChange);
    };
  }, []);

  return (
    <div>
      {children}
      
      {isLoggedIn && appointmentData && showNotification && (
        <div className="appointment-card">
          <div className="appointment-card__content">
            <h3 className="appointment-card__title">Upcoming Appointment</h3>
            <p className="appointment-card__message">
              <strong>Patient:</strong> {username}
            </p>
            <p className="appointment-card__message">
              <strong>Doctor:</strong> {appointmentData.doctorName || appointmentData.doctor || appointmentData.name}
            </p>
            <p className="appointment-card__message">
              <strong>Date:</strong> {appointmentData.date || appointmentData.selectedDate}
            </p>
            <p className="appointment-card__message">
              <strong>Time:</strong> {appointmentData.time || appointmentData.selectedSlot}
            </p>
            <button className="close-notification" onClick={() => setShowNotification(false)}>
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;