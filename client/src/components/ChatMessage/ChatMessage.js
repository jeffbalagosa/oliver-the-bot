import React from "react";
import oliver from "../../pics/oliverPic.png";
import me from "../../pics/myProfile.png";

const ChatMessage = ({ message }) => {
  return (
    <div
      className={`chat-message ${message.user === "oliver" && "oliver-bot"}`}
    >
      <div className="chat-message-center">
        <div className={`avatar ${message.user === "oliver" && "oliver-bot"}`}>
          {message.user === "oliver" ? (
            <img src={oliver} alt="Oliver's Profile" />
          ) : (
            <img src={me} alt="My Profile" />
          )}
        </div>
        <div className="message">
          {message.message.split("\n").map((line, i) => (
            <div className="double-spacing" key={i}>
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
