import "./normalize.css";
import "./App.css";
import oliver from "./pics/oliver-profile.jpg";
import me from "./pics/myProfile.png";
import { useState, useEffect } from "react";

function App() {
  useEffect(() => {
    getEngines();
  }, []);

  const [input, setInput] = useState("");
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState("ada");
  const [chatLog, setChatLog] = useState([]);

  function clearChat() {
    setChatLog([]);
  }

  function getEngines() {
    fetch("http://localhost:3080/models")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.models.data);
        setModels(data.models.data);
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
    setInput("");
    setChatLog(chatLogNew);
    const messages = chatLogNew.map((message) => message.message).join("\n");
    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: messages, currentModel }),
    });
    const data = await response.json();
    setChatLog([...chatLogNew, { user: "oliver", message: `${data.message}` }]);
  }

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span> New chat
        </div>
        <div className="models">
          <select
            onChange={(e) => {
              setCurrentModel(e.target.value);
            }}
          >
            {models.map((model, index) => (
              <option key={model.id} value={model.id}>
                {model.id}
              </option>
            ))}
          </select>
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
