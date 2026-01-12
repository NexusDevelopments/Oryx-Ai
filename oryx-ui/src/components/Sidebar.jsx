import React from "react";
import styles from "./Sidebar.module.css";

export default function Sidebar({ conversations, activeId, onNew, onSelect, onRename, onDelete }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <button className={styles.newBtn} onClick={onNew} aria-label="New conversation">
          + New Chat
        </button>
      </div>
      <nav className={styles.listWrap} aria-label="Conversations">
        {conversations.length === 0 && (
          <div className={styles.empty}>No conversations</div>
        )}
        {conversations.map(conv => (
          <div
            key={conv.id}
            className={conv.id === activeId ? styles.activeItem : styles.item}
            tabIndex={0}
            onClick={() => onSelect(conv.id)}
            onKeyDown={e => (e.key === 'Enter' ? onSelect(conv.id) : undefined)}
            aria-current={conv.id === activeId ? 'true' : undefined}
          >
            <span className={styles.title} title={conv.title}>{conv.title}</span>
            <button className={styles.renameBtn} onClick={e => {e.stopPropagation(); onRename(conv.id);}} aria-label="Rename conversation">✎</button>
            <button className={styles.deleteBtn} onClick={e => {e.stopPropagation(); onDelete(conv.id);}} aria-label="Delete conversation">×</button>
          </div>
        ))}
      </nav>
    </aside>
  );
}
