import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import '../styles.css';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'oryx',
      content: `You are Oryx — focused, minimal, and precise.\nHow can I assist you?`
    }
  ]);
  const [input, setInput] = useState('');
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
      { role: 'user', content: input.trim() },
      {
        role: 'oryx',
        content:
          'Oryx is in local demo mode. Production AI integration is not yet enabled.'
      }
    ]);
    setInput('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      <Head>
        <title>Oryx — VS Code AI Agent</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="oryx-container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
          <img src="/oryx-logo.svg" alt="Oryx Logo" width={80} height={80} style={{ marginBottom: 8 }} />
          <div className="oryx-title">Oryx</div>
          <div className="oryx-desc">
            Visual & Behavior Prompt (VS Code AI Agent)
          </div>
        </div>
        <div className="oryx-chat" ref={chatRef}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`oryx-message ${msg.role}`}
              aria-label={msg.role === 'oryx' ? 'Oryx' : 'User'}
            >
              {msg.content}
            </div>
          ))}
        </div>
        <div className="oryx-input-row">
          <textarea
            className="oryx-input"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your prompt..."
            aria-label="Prompt input"
            autoFocus
          />
          <button className="oryx-send-btn" onClick={handleSend} aria-label="Send">
            Send
          </button>
        </div>
      </main>
    </>
  );
}
