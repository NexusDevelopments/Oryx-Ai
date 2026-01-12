


import React, { useState, useEffect, useRef } from 'react';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AdvancedControls from './components/AdvancedControls';
import ChatArea from './components/ChatArea';
import InputArea from './components/InputArea';
import './App.css';


import { useCallback } from 'react';

function App() {

  // Conversation state
  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem('oryx-conversations');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeId, setActiveId] = useState(() => {
    const saved = localStorage.getItem('oryx-active');
    return saved || null;
  });
  // Message state
  const [messages, setMessages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [typing, setTyping] = useState(false);
  // Input state
  const [input, setInput] = useState("");
  // Ref for streaming simulation
  const streamingTimeout = useRef(null);

  // Advanced controls state
  const [model, setModel] = useState('oryx-1');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.5);
  const [webSearch, setWebSearch] = useState(false);
  const [fileUploadEnabled] = useState(false); // placeholder for future


  // Persist conversations and activeId
  useEffect(() => {
    localStorage.setItem('oryx-conversations', JSON.stringify(conversations));
  }, [conversations]);
  useEffect(() => {
    if (activeId) localStorage.setItem('oryx-active', activeId);
  }, [activeId]);

  // Load messages for active conversation
  useEffect(() => {
    if (!activeId) {
      setMessages([]);
      return;
    }
    const conv = conversations.find(c => c.id === activeId);
    setMessages(conv ? conv.messages : []);
  }, [activeId, conversations]);

  // Conversation handlers
  const handleNew = useCallback(() => {
    const id = Date.now().toString();
    const newConv = { id, title: 'New Chat', messages: [] };
    setConversations(prev => [newConv, ...prev]);
    setActiveId(id);
  }, []);
  const handleSelect = useCallback(id => setActiveId(id), []);
  const handleRename = useCallback(id => {
    setConversations(prev => {
      const title = prompt('Rename conversation:', prev.find(c => c.id === id)?.title || '');
      if (title && title.trim()) {
        return prev.map(c => c.id === id ? { ...c, title: title.trim() } : c);
      }
      return prev;
    });
  }, []);
  const handleDelete = useCallback(id => {
    setConversations(prev => {
      const idx = prev.findIndex(c => c.id === id);
      if (idx === -1) return prev;
      const newConvs = prev.filter(c => c.id !== id);
      if (activeId === id) setActiveId(newConvs[0]?.id || null);
      return newConvs;
    });
  }, [activeId]);
  const handleClear = useCallback(() => {
    if (!activeId) return;
    setConversations(prev => prev.map(c => c.id === activeId ? { ...c, messages: [] } : c));
  }, [activeId]);

  // Message handlers
  const handleCopy = useCallback(id => {
    const msg = messages.find(m => m.id === id);
    if (msg) navigator.clipboard.writeText(msg.content);
  }, [messages]);
  const handleRegenerate = useCallback(id => {
    if (!activeId) return;
    const idx = messages.findIndex(m => m.id === id);
    if (idx === -1) return;
    const userMsg = messages[idx - 1];
    if (!userMsg || userMsg.role !== 'user') return;
    const newMsgs = messages.slice(0, idx);
    setMessages(newMsgs);
    setConversations(prev => prev.map(c => c.id === activeId ? { ...c, messages: newMsgs } : c));
    simulateOryxResponse(userMsg.content, newMsgs);
  }, [activeId, messages]);
  const handleStop = useCallback(() => {
    setIsStreaming(false);
    setTyping(false);
    if (streamingTimeout.current) clearTimeout(streamingTimeout.current);
  }, []);
  const handleInputChange = useCallback(v => setInput(v), []);
  const handleSend = useCallback(() => {
    if (!input.trim() || !activeId) return;
    const userMsg = { id: Date.now().toString(), role: 'user', content: input.trim() };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setConversations(prev => prev.map(c => c.id === activeId ? { ...c, messages: newMsgs } : c));
    setInput("");
    simulateOryxResponse(input.trim(), newMsgs);
  }, [input, activeId, messages]);

  // Simulate ORYX streaming response
  function simulateOryxResponse(userText, currentMsgs) {
    setIsStreaming(true);
    setTyping(true);
    const oryxMsg = { id: (Date.now() + 1).toString(), role: 'oryx', content: '' };
    let i = 0;
    const reply = `Echo: ${userText}`;
    function stream() {
      if (!isStreaming) return;
      oryxMsg.content = reply.slice(0, i);
      setMessages([...currentMsgs, { ...oryxMsg }]);
      setConversations(conversations.map(c => c.id === activeId ? { ...c, messages: [...currentMsgs, { ...oryxMsg }] } : c));
      if (i < reply.length) {
        i++;
        streamingTimeout.current = setTimeout(stream, 18);
      } else {
        setIsStreaming(false);
        setTyping(false);
      }
    }
    stream();
  }

  // Accessibility: skip to chat
  const chatAreaRef = useRef(null);
  const handleSkipToChat = e => {
    e.preventDefault();
    chatAreaRef.current?.focus();
  };

  return (
    <div className="oryx-root">
      <a href="#main-chat" className="visually-hidden-focusable" onClick={handleSkipToChat} tabIndex={0}>Skip to chat</a>
      <Header />
      <Sidebar
        conversations={conversations}
        activeId={activeId}
        onNew={handleNew}
        onSelect={handleSelect}
        onRename={handleRename}
        onDelete={handleDelete}
      />
      <AdvancedControls
        model={model}
        setModel={setModel}
        systemPrompt={systemPrompt}
        setSystemPrompt={setSystemPrompt}
        temperature={temperature}
        setTemperature={setTemperature}
        webSearch={webSearch}
        setWebSearch={setWebSearch}
        fileUploadEnabled={fileUploadEnabled}
      />
      <ChatArea
        messages={messages}
        onCopy={handleCopy}
        onRegenerate={handleRegenerate}
        onStop={handleStop}
        isStreaming={isStreaming}
        typing={typing}
        ref={chatAreaRef}
        id="main-chat"
      />
      <InputArea
        value={input}
        onChange={handleInputChange}
        onSend={handleSend}
        disabled={isStreaming || !activeId}
      />
      <button
        style={{position:'fixed',left:270,top:56,zIndex:200,background:'#232425',color:'#fff',border:'none',padding:'6px 16px',fontSize:'0.98em',cursor:'pointer'}}
        onClick={handleClear}
        disabled={!activeId}
        aria-label="Clear conversation"
      >Clear</button>
      <style>{`.visually-hidden-focusable{position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden;} .visually-hidden-focusable:focus{position:fixed;left:50%;top:8px;width:auto;height:auto;z-index:9999;background:#232425;color:#fff;padding:8px 16px;border-radius:2px;outline:2px solid #fff;}`}</style>
    </div>
  );
}

export default App;
