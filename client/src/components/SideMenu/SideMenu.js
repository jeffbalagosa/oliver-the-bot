import React from "react";

function SideMenu({ apiKey, setApiKey, clearChat }) {
  return (
    <aside className="sidemenu">
      <div className="side-menu-button" onClick={clearChat}>
        <span>+</span> New chat
      </div>
      <section className="aside-section">
        <label htmlFor="api-key">OpenAI API-Key:</label>
        <input
          type="password"
          id="api-key"
          name="api-key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </section>
    </aside>
  );
}

export default SideMenu;
