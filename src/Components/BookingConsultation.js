import React, { useEffect, useState } from 'react';
// import './BookingConsultation.css';
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch';
import DoctorCard from './DoctorCard/DoctorCard';

const BookingConsultation = () => {
    const [allDoctors, setAllDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const fetchDoctors = () => {
            const data = [
                { id: 1, name: "Dr. Junaed", speciality: "Cardiologist", experience: 15, ratings: 5, profilePic: "https://via.placeholder.com/150" },
                { id: 2, name: "Dr. Jane Doe", speciality: "Dentist", experience: 10, ratings: 4, profilePic: "https://via.placeholder.com/150" },
                { id: 3, name: "Dr. Amir", speciality: "General Physician", experience: 8, ratings: 5, profilePic: "https://via.placeholder.com/150" },
                { id: 4, name: "Dr. Sarah", speciality: "Neurologist", experience: 12, ratings: 4, profilePic: "https://via.placeholder.com/150" },
            ];
            setAllDoctors(data);
        };
        fetchDoctors();
    }, []);

    const handleSearch = (searchText) => {
        if (searchText === '') {
            setFilteredDoctors([]);
            setIsSearching(false);
        } else {
            const filtered = allDoctors.filter(
                (doctor) => doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredDoctors(filtered);
            setIsSearching(true);
        }
    };

    return (
        <div className="booking-container">
            <FindDoctorSearch onSearch={handleSearch} />

            <div className="search-results-section">
                {isSearching ? (
                    <>
                        <h2>{filteredDoctors.length} doctors available</h2>
                        <div className="doctor-grid">
                            {filteredDoctors.map(doctor => (
                                <DoctorCard 
                                    key={doctor.id} 
                                    {...doctor} 
                                    // ENSURE: The card knows how to save the data
                                    onBook={(details) => {
                                        localStorage.setItem('doctorData', JSON.stringify(doctor));
                                        localStorage.setItem('appointmentData', JSON.stringify(details));
                                    }}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="search-prompt">
                        <h2>Search by specialty to find the right doctor for you.</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingConsultation;