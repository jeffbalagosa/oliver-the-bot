import "./normalize.css";
import "./App.css";
import oliver from "./pics/oliver-profile.jpg";
import me from "./pics/myProfile.png";

function App() {
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
          <textarea rows="1" className="chat-input-textarea"></textarea>
        </div>
      </section>
    </div>
  );
}

export default App;
