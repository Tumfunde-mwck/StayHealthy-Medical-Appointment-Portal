import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../config';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Redirect to home if already logged in
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (res.ok && json.authtoken) {
        // 1. Save the token for authentication
        sessionStorage.setItem("auth-token", json.authtoken);
        
        // 2. Save the email so Navbar can "extract" your username
        sessionStorage.setItem("email", email);
        
        // 3. Navigate back to the home page
        navigate("/");
        
        // 4. Force a reload so the Navbar component detects the new session data
        window.location.reload();
      } else {
        // Handle login errors (Invalid credentials, etc.)
        const errorMsg = json.error || (json.errors ? json.errors[0].msg : "Invalid Credentials");
        alert(errorMsg);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Could not connect to the server. Please check if your backend is running.");
    }
  };

  return (
    <div className="container" style={{marginTop: '10%'}}>
      <div className="login-grid">
        <div className="login-text">
          <h2>Login</h2>
          <p>
            Are you a new member? <Link to="/signup" style={{color: '#2190FF'}}>Sign Up Here</Link>
          </p>
        </div>
        <div className="login-form">
          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="btn-group">
              <button type="submit" className="btn btn-primary">Login</button>
              <button type="reset" className="btn btn-danger" onClick={() => {setEmail(""); setPassword("");}}>Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;