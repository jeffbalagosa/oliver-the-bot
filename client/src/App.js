import "./normalize.css";
import "./App.css";
import oliver from "./pics/oliverPic.png";
import me from "./pics/myProfile.png";
import { useState, useEffect } from "react";

function App() {
  useEffect(() => {
    getEngines();
  }, []);

  const [input, setInput] = useState("");
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState("text-davinci-003");
  const [chatLog, setChatLog] = useState([]);

  function clearChat() {
    setChatLog([]);
  }

  function getEngines() {
    fetch("http://localhost:3080/models")
      .then((response) => response.json())
      .then((data) => {
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
          <h2>Model</h2>
          <select
            className="model-select"
            onChange={(e) => {
              setCurrentModel(e.target.value);
            }}
            value={currentModel}
          >
            {models && models.length > 0 ? (
              models.map((model, index) => (
                <option key={model.id} value={model.id}>
                  {model.id}
                </option>
              ))
            ) : (
              <option>Loading...</option>
            )}
          </select>
          <p>
            The model which will generate the completion. Some models are
            suitable for natural language tasks, others specialize in code.
          </p>
        </div>
        <div>
          <h2>API-Key</h2>
          <p>
            The API key is used to authenticate your requests. You can find your
            API key in your account settings at
            <span>
              {" "}
              <a
                href="https://openai.com/api/"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                OpenAI
              </a>
              .
            </span>
          </p>
          <input
            className="api-key"
            type="password"
            placeholder="Enter Your OpenAI API Key"
            value={process.env.REACT_APP_OPENAI_API_KEY}
          />
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
  console.log(message);
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
