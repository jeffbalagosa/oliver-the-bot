import "./normalize.css";
import "./App.css";
import oliver from "./pics/oliver-profile.jpg";
import me from "./pics/myProfile.png";
// import setState from "react";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    setChatLog([...chatLog, { user: 'me', message: `${input}` }]);
    setInput("");
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
          <div className="chat-message">
            <div className="chat-message-center">
              <div className="avatar">
                <img src={me} alt="My Profile" />
              </div>
              <div className="message">Hello World!</div>
            </div>
          </div>
          <div className="chat-message oliver-bot">
            <div className="chat-message-center">
              <div className="avatar oliver-bot">
                <img src={oliver} alt="Oliver's Profile" />
              </div>
              <div className="message">
                Hello! My name is Oliver. I am your helpful AI assistant. Ask me
                anything and I will do my best to help you.
              </div>
            </div>
          </div>
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              rows="1"
              value={input}
              onChange={() => setInput(input) = e.target.value}
              className="chat-input-textarea"
            ></input>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
