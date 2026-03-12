import React, { useState } from 'react';
import './FindDoctorSearch.css';
import DoctorCard from '../DoctorCard/DoctorCard';

// Sample data for your doctors (This defines 'filteredDoctors' later)
const initDoctors = [
    { 
        id: 1, 
        name: "Dr. Jhon Doe", 
        speciality: "Cardiologist", 
        experience: 15, 
        ratings: 4.5, 
        profilePic: "/doctor1.jpg" 
    },
    { 
        id: 2, 
        name: "Dr. Jane Smith", 
        speciality: "Dermatologist", 
        experience: 10, 
        ratings: 4.8, 
        profilePic: "/doctor2.jpg" 
    },
    { 
        id: 3, 
        name: "Dr. Okey Ugwueze", 
        speciality: "Urologist", 
        experience: 5, 
        ratings: 4.0, 
        profilePic: "/doctor3.jpg" // Check if this file exists in public/
    },
    { 
        id: 4, // CHANGED from 3 to 4
        name: "Dr. Jane Ukamaka", 
        speciality: "Neurologist", 
        experience: 3, 
        ratings: 3.6, 
        profilePic: "/doctor4.jpg" // CHANGED from doctor3 to doctor4
    },
];

const FindDoctorSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState(initDoctors);

    // This handles the search logic
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = initDoctors.filter(doc => 
            doc.speciality.toLowerCase().includes(query)
        );
        setFilteredDoctors(filtered);
    };

    return (
        <div className="find-doctor-container">
            <center>
                <h2>Find a doctor and Consult remotely</h2>
                <div className="search-box-area">
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Search doctors by speciality..." 
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
            </center>

            <div className="search-results">
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map(doctor => (
                        <DoctorCard key={doctor.id} {...doctor} />
                    ))
                ) : (
                    <p>No doctors found for this speciality.</p>
                )}
            </div>
        </div>
    );
};

// CRITICAL: This fixes the "Default Export" error!
export default FindDoctorSearch;
