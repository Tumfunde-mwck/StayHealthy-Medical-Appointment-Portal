import React, { useState } from 'react';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, phoneNumber, selectedDate, selectedSlot });
        setName('');
        setPhoneNumber('');
        setSelectedDate('');
        setSelectedSlot('');
    };

    return (
        <form onSubmit={handleFormSubmit} className="appointment-form">
            <div className="form-group">
                <label htmlFor="name">Patient Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="date">Date of Appointment:</label>
                <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="slot">Book Time Slot:</label>
                <select 
                    id="slot" 
                    value={selectedSlot} 
                    onChange={(e) => setSelectedSlot(e.target.value)} 
                    required
                >
                    <option value="">Select a slot</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                </select>
            </div>
            <button type="submit" className="btn-primary">Confirm Appointment</button>
        </form>
    );
};

export default AppointmentForm;