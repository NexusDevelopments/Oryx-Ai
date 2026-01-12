


import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import ChatArea from './components/ChatArea';
import InputArea from './components/InputArea';
import './App.css';

function App() {

  // Conversation state scaffold
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);

  // Message state scaffold
  const [messages, setMessages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [typing, setTyping] = useState(false);
  // Input state
  const [input, setInput] = useState("");


  // Handlers (to be implemented)
  const handleNew = () => {};
  const handleSelect = id => {};
  const handleRename = id => {};
  const handleDelete = id => {};
  const handleCopy = id => {};
  const handleRegenerate = id => {};
  const handleStop = () => {};
  const handleInputChange = v => setInput(v);
  const handleSend = () => {
    // To be implemented: send message logic
    setInput("");
  };

  return (
    <div className="oryx-root">
      <Header />
      <Sidebar
        conversations={conversations}
        activeId={activeId}
        onNew={handleNew}
        onSelect={handleSelect}
        onRename={handleRename}
        onDelete={handleDelete}
      />
      <ChatArea
        messages={messages}
        onCopy={handleCopy}
        onRegenerate={handleRegenerate}
        onStop={handleStop}
        isStreaming={isStreaming}
        typing={typing}
      />
      <InputArea
        value={input}
        onChange={handleInputChange}
        onSend={handleSend}
        disabled={isStreaming}
      />
    </div>
  );
}

export default App;
