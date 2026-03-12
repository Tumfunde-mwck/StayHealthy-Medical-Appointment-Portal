import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const handleClick = () => setClick(!click);
    
    const handleDropdownToggle = () => setShowDropdown(!showDropdown);

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.removeItem("doctorData");
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith("reviewFormData_")) {
            localStorage.removeItem(key);
          }
        }
        setIsLoggedIn(false);
        setShowDropdown(false);
        window.location.reload();
    }

    useEffect(() => { 
      const token = sessionStorage.getItem("auth-token");
      const storedEmail = sessionStorage.getItem("email");
      
      if (token && storedEmail) {
            setIsLoggedIn(true);
            const nameFromEmail = storedEmail.split('@')[0];
            setUsername(nameFromEmail);
          }
    }, []);

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
          StayHealthy <i style={{color:'#2190FF'}} className="fa fa-user-md"></i>
        </Link>
        <span>.</span>
      </div>
      
      <div className="nav__icon" onClick={handleClick}>
        <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
      </div>

      <ul className={click ? 'nav__links active' : 'nav__links'}>
        <li className="link"><Link to="/">Home</Link></li>
        <li className="link"><Link to="/search/doctors">Appointments</Link></li>
        <li className="link"><Link to="/healthblog">Health Blog</Link></li>
        <li className="link"><Link to="/reviews">Reviews</Link></li>

        {isLoggedIn ? (
          <li className="link dropdown" onClick={handleDropdownToggle}>
            <span style={{color:'#2190FF', fontWeight:'bold', cursor:'pointer'}}>
              Welcome, {username} <i className="fa fa-caret-down"></i>
            </span>
            
            {showDropdown && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/profile" onClick={() => setShowDropdown(false)}>Your Profile</Link>
                </li>
                {/* Exercise 7: Link successfully integrated into navigation */}
                <li>
                  <Link to="/reports" onClick={() => setShowDropdown(false)}>Your Reports</Link>
                </li>
                <li>
                  <button className="btn2 logout-dropdown-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </li>
        ) : (
          <>
            <li className="link">
              <Link to="/signup">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>
            <li className="link">
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;