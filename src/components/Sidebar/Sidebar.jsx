import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { Context } from "../../context/Context";
const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          src="https://www.freeiconspng.com/thumbs/menu-icon/menu-icon-24.png"
          alt=""
          className="menu"
          onClick={() => setExtended((prev) => !prev)}
        />
        <div className="new-chat" onClick={() => newChat()}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/8212/8212741.png"
            alt=""
          />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div className="recent-entry" onClick={() => loadPrompt(item)}>
                  <img
                    src="https://icons.veryicon.com/png/o/miscellaneous/ios-icon-library/message-message-3.png"
                    alt=""
                  />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img
            src="https://icons.veryicon.com/png/o/miscellaneous/offerino-icons/question-25.png"
            alt=""
          />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2961/2961948.png"
            alt=""
          />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img
            src="https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png"
            alt=""
          />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
