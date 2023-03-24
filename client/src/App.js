import "./normalize.css";
import "./App.css";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [conversation, setConversation] = useState([
    {
      role: "system",
      content:
        "You are a helpful and polite AI assistant named Oliver. You have vast knowledge and can help people with their problems.",
    },
  ]);

  function clearChat() {
    setChatLog([]);
    setConversation([
      {
        role: "system",
        content:
          "You are a helpful and polite AI assistant named Oliver. You have vast knowledge and can help people with their problems.",
      },
    ]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
    setInput("");
    setChatLog(chatLogNew);
    const newConversation = [...conversation, { role: "user", content: input }];
    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ conversation: newConversation }),
    });
    const data = await response.json();
    setChatLog([...chatLogNew, { user: "oliver", message: `${data.message}` }]);
    setConversation([
      ...newConversation,
      { role: "assistant", content: data.message },
    ]);
  }

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
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

export default App;
