import React, { useRef, useEffect } from "react";
import styles from "./InputArea.module.css";

export default function InputArea({ value, onChange, onSend, disabled }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) onSend();
    }
  };

  return (
    <form className={styles.inputArea} onSubmit={e => {e.preventDefault(); if (value.trim()) onSend();}}>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message ORYX..."
        rows={1}
        disabled={disabled}
        aria-label="Chat input"
      />
      {value.trim() && (
        <button type="submit" className={styles.sendBtn} aria-label="Send message">
          ➤
        </button>
      )}
    </form>
  );
}
