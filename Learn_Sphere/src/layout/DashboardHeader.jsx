import React from "react";

import styles from "./DashboardHeader.module.css";

function DashboardHeader({ username }) {
  return (
    <div className={styles.dashboardHeader}>
      <div className={styles.title}>
        <h2>LearnSphere</h2>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.username}>
          <span>{username}</span>
        </div>

        <img
          className={styles.userIcon}
          src="../images/icons/user.png"
          alt="user-icon"
        />
      </div>
    </div>
  );
}

export default DashboardHeader;
