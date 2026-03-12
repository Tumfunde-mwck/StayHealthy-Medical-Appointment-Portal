import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/Landing_Page';
import SignUp from './Components/Sign_Up/Sign_Up'; 
import Login from './Components/Login/Login';
import InstantConsultation from './Components/BookingConsultation'; 
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch'; 
import Notification from './Components/Notification/Notification';
import ReviewForm from './Components/ReviewForm/ReviewForm'; 
import ProfileCard from './Components/ProfileCard/ProfileCard';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar/>
          {/* Notification wraps the Routes to handle global messaging */}
          <Notification>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/instant-consultation" element={<InstantConsultation />} />
              <Route path="/search/doctors" element={<FindDoctorSearch />} />
              
              {/* ADDED: The route for the ReviewForm component */}
              <Route path="/reviews" element={<ReviewForm />} />
              <Route path="/profile" element={<ProfileCard />} />
              <Route path="/reports" element={<ReportsLayout />} />
              
            </Routes>
          </Notification>
        </BrowserRouter>
    </div>
  );
}

export default App;