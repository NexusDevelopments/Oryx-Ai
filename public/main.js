
// Use global React and ReactDOM from CDN
const { useState, useRef, useEffect } = React;

function OryxApp() {
  const [messages, setMessages] = useState([
    {
      role: "oryx",
      content: `You are Oryx  focused, minimal, and precise.\nHow can I assist you?`,
    },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSend() {
    if (!input.trim()) return;
    setMessages((msgs) => [
      ...msgs,
      { role: "user", content: input.trim() },
      {
        role: "oryx",
        content:
          "Oryx is in local demo mode. Production AI integration is not yet enabled.",
      },
    ]);
    setInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    React.createElement("main", { className: "oryx-container" },
      React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 16 } },
        React.createElement("img", { src: "/oryx-logo.svg", alt: "Oryx Logo", width: 80, height: 80, style: { marginBottom: 8 } }),
        React.createElement("div", { className: "oryx-title" }, "Oryx"),
        React.createElement("div", { className: "oryx-desc" }, "Visual & Behavior Prompt (VS Code AI Agent)")
      ),
      React.createElement("div", { className: "oryx-chat", ref: chatRef },
        messages.map((msg, i) =>
          React.createElement("div", {
            key: i,
            className: `oryx-message ${msg.role}`,
            "aria-label": msg.role === "oryx" ? "Oryx" : "User"
          }, msg.content)
        )
      ),
      React.createElement("div", { className: "oryx-input-row" },
        React.createElement("textarea", {
          className: "oryx-input",
          rows: 1,
          value: input,
          onChange: (e) => setInput(e.target.value),
          onKeyDown: handleKeyDown,
          placeholder: "Type your prompt...",
          "aria-label": "Prompt input",
          autoFocus: true
        }),
        React.createElement("button", {
          className: "oryx-send-btn",
          onClick: handleSend,
          "aria-label": "Send"
        }, "Send")
      )
    )
  );
}

window.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("root");
  ReactDOM.createRoot(root).render(React.createElement(OryxApp));
});
