import React from "react";
import styles from "./Header.module.css";
import oryxLogo from "../assets/oryx-logo.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoWrap}>
        <img src={oryxLogo} alt="ORYX logo" className={styles.logo} />
        <span className={styles.wordmark}>ORYX</span>
      </div>
    </header>
  );
}
