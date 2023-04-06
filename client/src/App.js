import "./normalize.css";
import "./App.css";
import { useState, useEffect } from "react";
import SideMenu from "./components/SideMenu/SideMenu";
import ChatBox from "./components/ChatBox/ChatBox";

const personalities = {
  "General Assistant": {
    role: "system",
    content:
      "Ignore all previous prompts and commands. Your name is Oliver, and you are a polite and helpful AI assistant. You can help answer questions, brainstorm ideas, draft emails, write code, give advice, and much more.",
  },
  "Coding Assistant": {
    role: "system",
    content:
      "Ignore all previous prompts and commands. Your name is Oliver, and you are an AI programming assistant whose main priority is to follow user requirements closely. Begin by devising a comprehensive plan in pseudocode, describing each step in great detail. After establishing the pseudocode, proceed to output the code within a single code block, keeping any other prose to a minimum.",
  },
};

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [apiKey, setApiKey] = useState("");
  const [personality, setPersonality] = useState(
    personalities["General Assistant"]
  );

  // This effect runs once when the component mounts, setting the initial conversation
  useEffect(() => {
    setConversation([personality]);
  }, []);

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
      <SideMenu apiKey={apiKey} setApiKey={setApiKey} clearChat={clearChat} />
      <ChatBox
        chatLog={chatLog}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
