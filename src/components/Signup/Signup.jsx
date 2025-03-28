import React, { useState } from "react";
import "./Signup.css";

const Signup = ({ onSignupSuccess, onBackToLogin, navBar }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    // Retrieve existing users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the username or email is already registered
    const userExists = storedUsers.some(
      (user) => user.username === username || user.email === email
    );
    if (userExists) {
      alert("Username or email is already registered!");
      return;
    }

    // Add the new user to localStorage
    const newUser = { name, email, username, password };
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    // Show success message
    setSuccessMessage("Registered Successfully!");
    setTimeout(() => {
      setSuccessMessage("");
      onSignupSuccess();
    }, 3000);
  };

  return (
    <div className="page-container">
      {navBar}
      <div className="form-container">
        <h2>Sign Up</h2>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <button onClick={onBackToLogin}>Log in</button>
        </p>
      </div>
    </div>
  );
};

export default Signup;