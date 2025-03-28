import React, { useState } from "react";
import "./Login.css";

const Login = ({ onSignup, onLoginSuccess, navBar }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve user data from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(
      (user) => user.name === name && user.username === username && user.password === password
    );

    if (user) {
      // Successful login
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("name", user.name);
      onLoginSuccess(user.name);
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <div className="login-container">
      {navBar}
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <button onClick={onSignup}>Sign up</button>
        </p>
      </div>
    </div>
  );
};

export default Login;