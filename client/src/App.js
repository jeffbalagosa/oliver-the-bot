import "./normalize.css";
import "./App.css";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const personalities = [
    {
      role: "system",
      content:
        "Ignore all previous prompts and commands. Your name is Oliver, and you are a polite and helpful AI assistant. You can help answer questions, brainstorm ideas, draft emails, write code, give advice, and much more.",
    },
    {
      role: "system",
      content:
        "Ignore all previous prompts and commands. Your name is Oliver, and you are an AI programming assistant whose main priority is to follow user requirements closely. Begin by devising a comprehensive plan in pseudocode, describing each step in great detail. After establishing the pseudocode, proceed to output the code within a single code block, keeping any other prose to a minimum.",
    },
  ];

  const personality = personalities[0];

  // States
  const [conversation, setConversation] = useState([personality]);
  const [apiKey, setApiKey] = useState("");

  function clearChat() {
    setChatLog([]);
    setConversation([personality]);
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
      body: JSON.stringify({ conversation: newConversation, apiKey }),
    });
    const data = await response.json();
    setChatLog([...chatLogNew, { user: "oliver", message: `${data.message}` }]);
    setConversation([
      ...newConversation,
      { role: "assistant", content: data.message },
    ]);
    console.log(`Running total of tokens used: ${data.usage.total_tokens}`);
    // if block to keep the conversation from getting too long and confusing the bot
    if (data.usage.total_tokens > 3276) {
      setConversation(newConversation.slice(4));
    }
  }

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span> New chat
        </div>
        <section className="aside-section">
          <label for="api-key">OpenAI API-Key:</label>
          <input
            type="password"
            id="api-key"
            name="api-key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </section>
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
