import React from "react";
import styles from "./AdvancedControls.module.css";

const AdvancedControls = React.memo(function AdvancedControls({
  model, setModel, systemPrompt, setSystemPrompt, temperature, setTemperature, webSearch, setWebSearch, fileUploadEnabled
}) {
  return (
    <section className={styles.advanced} aria-label="Advanced controls">
      <div className={styles.row}>
        <label className={styles.label} htmlFor="model-select">Model</label>
        <select id="model-select" value={model} onChange={e => setModel(e.target.value)} className={styles.select}>
          <option value="oryx-1">ORYX-1</option>
          <option value="oryx-2">ORYX-2</option>
          <option value="grok">Grok (xAI)</option>
        </select>
      </div>
      <div className={styles.row}>
        <label className={styles.label} htmlFor="system-prompt">System Prompt</label>
        <input id="system-prompt" className={styles.input} value={systemPrompt} onChange={e => setSystemPrompt(e.target.value)} placeholder="System prompt..." />
      </div>
      <div className={styles.row}>
        <label className={styles.label} htmlFor="temperature">Creativity</label>
        <input id="temperature" type="range" min="0" max="1" step="0.01" value={temperature} onChange={e => setTemperature(Number(e.target.value))} className={styles.slider} />
        <span className={styles.tempVal}>{temperature}</span>
      </div>
      <div className={styles.row}>
        <label className={styles.label} htmlFor="web-search">Web Search</label>
        <input id="web-search" type="checkbox" checked={webSearch} onChange={e => setWebSearch(e.target.checked)} className={styles.checkbox} />
      </div>
      <div className={styles.row}>
        <label className={styles.label}>File Upload</label>
        <input type="file" disabled={!fileUploadEnabled} className={styles.file} />
      </div>
      <div className={styles.row}>
        <span className={styles.tokenInfo}>Context: 4096 tokens (mocked)</span>
        <span className={styles.tokenInfo}>Usage: 0 tokens (mocked)</span>
      </div>
    </section>
  );
});
export default AdvancedControls;
