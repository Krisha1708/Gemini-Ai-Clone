import React, { useContext, useRef, useState } from "react";
import "./Main.css";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResults,
    setShowResults, // Add function to update showResults state
    loading,
    resultData,
    setInput,
    input,
    handleVoiceInput, // Get voice input function
    isListening, // Get listening status
  } = useContext(Context);

  const micRef = useRef(null);
  const [querySent, setQuerySent] = useState(false); // Track if a query is sent

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
    setQuerySent(true); // Mark query as sent to show pause button
  };

  // Function to pause the current result view and reset for a new chat
  const handlePause = () => {
    console.log("Pause button clicked");
    setShowResults(false); // Hide the results
    setInput(""); // Clear the input field
    setQuerySent(false); // Reset query sent status to show Send button again
    console.log("Results hidden, input cleared, querySent reset");
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img
          src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg"
          alt=""
        />
      </div>
      <div className="main-container">
        {!showResults ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
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
                onClick={toggleMic} // Attach microphone event
              />
              {querySent ? ( // If query is sent, show Pause button
                <img
                  src="https://cdn-icons-png.flaticon.com/512/61/61180.png"
                  alt="pause"
                  onClick={handlePause} // Pause functionality
                />
              ) : (
                <img
                  src="https://icons.veryicon.com/png/o/miscellaneous/utility/send-26.png"
                  alt="send"
                  onClick={handleSend} // Send functionality
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
