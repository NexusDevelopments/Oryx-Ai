import React from "react";
import styles from "./ChatArea.module.css";

export default function ChatArea({ messages, onCopy, onRegenerate, onStop, isStreaming, typing }) {
  return (
    <main className={styles.chatArea} tabIndex={0} aria-label="Chat messages">
      <div className={styles.inner}>
        {messages.length === 0 && (
          <div className={styles.empty}>ORYX is ready. Start a conversation.</div>
        )}
        {messages.map((msg, i) => (
          <div key={msg.id || i} className={msg.role === 'user' ? styles.userMsg : styles.oryxMsg}>
            <div className={styles.msgContent}>{msg.content}</div>
            {msg.role !== 'user' && (
              <div className={styles.msgActions}>
                <button onClick={() => onCopy(msg.id)} aria-label="Copy message">⧉</button>
                <button onClick={() => onRegenerate(msg.id)} aria-label="Regenerate response">↻</button>
                {isStreaming && i === messages.length - 1 && (
                  <button onClick={onStop} aria-label="Stop generation">■</button>
                )}
              </div>
            )}
          </div>
        ))}
        {typing && (
          <div className={styles.oryxMsg}>
            <div className={styles.typing}>ORYX is typing…</div>
          </div>
        )}
      </div>
    </main>
  );
}
