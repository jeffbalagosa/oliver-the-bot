import "./normalize.css";
import "./App.css";
import oliver from "./pics/oliver-profile.jpg";
import me from "./pics/myProfile.png";
// import setState from "react";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    { user: "oliver", message: "I am Oliver." },
    { user: "me", message: "I am me." },
  ]);

  async function handleSubmit(e) {
    e.preventDefault();
    setChatLog([...chatLog, { user: "me", message: `${input}` }]);
    setInput("");

    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: chatLog.map((message) => message.message).join(""),
      }),
    });
    const data = await response.json();
    setChatLog([...chatLog, { user: "oliver", message: `${data.message}` }]);
    console.log(data.message);
  }

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button">
          <span>+</span> New chat
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input-textarea"
            ></input>
          </form>
        </div>
      </section>
    </div>
  );
}

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
        <div className="message">{message.message}</div>
      </div>
    </div>
  );
};

export default App;
