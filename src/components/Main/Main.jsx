import React, { useContext, useRef, useState } from "react";
import "./Main.css";
import { Context } from "../../context/Context";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResults,
    setShowResults,
    loading,
    resultData,
    setInput,
    input,
    handleVoiceInput,
    isListening,
  } = useContext(Context);

  const micRef = useRef(null);
  const [querySent, setQuerySent] = useState(false);
  const [currentPage, setCurrentPage] = useState("main"); // Track current page
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // Toggle microphone active state
  const toggleMic = () => {
    handleVoiceInput();
    if (isListening) {
      micRef.current.classList.remove("mic-active");
    } else {
      micRef.current.classList.add("mic-active");
    }
  };

  // Handle sending the query
  const handleSend = () => {
    onSent();
    setQuerySent(true);
  };

  // Function to pause the current result view and reset for a new chat
  const handlePause = () => {
    setShowResults(false);
    setInput("");
    setQuerySent(false);
  };

  // Handle navigation to Login page
  const handleNavClick = () => {
    setCurrentPage("login");
  };

  // Handle successful login
  const handleLoginSuccess = (userName) => {
    setLoggedInUser(true);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("name", userName);
    setCurrentPage("main");
  };

  // Handle navigation to Signup page
  const handleSignupClick = () => {
    setCurrentPage("signup");
  };

  // Handle successful signup
  const handleSignupSuccess = () => {
    setCurrentPage("login");
  };

  // Handle logout
  const handleLogout = () => {
    setLoggedInUser(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("name");
    setCurrentPage("login");
  };

  if (currentPage === "login") {
    return (
      <Login
        onSignup={handleSignupClick}
        onLoginSuccess={handleLoginSuccess}
        navBar={
          <div className="nav">
            <p>Gemini</p>
          </div>
        }
      />
    );
  }

  if (currentPage === "signup") {
    return (
      <Signup
        onSignupSuccess={handleSignupSuccess}
        onBackToLogin={() => setCurrentPage("login")}
        navBar={
          <div className="nav">
            <p>Gemini</p>
          </div>
        }
      />
    );
  }

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img
          src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg"
          alt=""
          onClick={handleNavClick} // Navigate to Login page
        />
        {loggedInUser && (
          <button onClick={handleLogout} style={{ marginLeft: "auto" }}>
            Logout
          </button>
        )}
      </div>
      <div className="main-container">
        {!showResults ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, {localStorage.getItem("name") || "Dev"}.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img
                  src="https://www.freeiconspng.com/thumbs/compass-icon/compass-icon-27.png"
                  alt=""
                />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img
                  src="https://icons.veryicon.com/png/o/business/my-library/light-bulb-14.png"
                  alt=""
                />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img
                  src="https://icons.veryicon.com/png/o/miscellaneous/ios-icon-library/message-message-3.png"
                  alt=""
                />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img
                  src="https://static-00.iconduck.com/assets.00/code-icon-512x342-a8m0wrhm.png"
                  alt=""
                />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img
                src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg"
                alt=""
              />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThr7qrIazsvZwJuw-uZCtLzIjaAyVW_ZrlEQ&s"
                alt=""
              />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData || "" }} />
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here "
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <div>
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/free-gallery-icon-download-in-svg-png-gif-file-formats--photo-image-saas-icons-pack-miscellaneous-902099.png?f=webp&w=256"
                alt=""
              />
              <img
                ref={micRef}
                src="https://www.iconpacks.net/icons/1/free-microphone-icon-342-thumb.png"
                alt="mic"
                className="mic-button"
                onClick={toggleMic}
              />
              {querySent ? (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/61/61180.png"
                  alt="pause"
                  onClick={handlePause}
                />
              ) : (
                <img
                  src="https://icons.veryicon.com/png/o/miscellaneous/utility/send-26.png"
                  alt="send"
                  onClick={handleSend}
                />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio
            saepe perferendis minus sequi optio error eaque illum mollitia.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;