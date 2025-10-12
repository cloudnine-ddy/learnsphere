import React, { useState } from "react";

import styles from "./RoleSelection.module.css";

function RoleSelection({ selectedRole, setSelectedRole }) {
  return (
    <div className={styles.roleSection}>
      <img
        className={styles.coverPic}
        src="images/pictures/cover.png"
        alt="cover picture"
      />

      <button
        className={`${styles.roleCard} ${
          selectedRole === "instructor" ? styles.active : ""
        }`}
        onClick={() => setSelectedRole("instructor")}
      >
        <img
          className={styles.roleIcon}
          src="images/icons/teacher.png"
          alt="teacher icon"
        />
        <p className={styles.roleInfo}>I am an Instructor</p>
      </button>

      <button
        className={`${styles.roleCard} ${
          selectedRole === "student" ? styles.active : ""
        }`}
        onClick={() => setSelectedRole("student")}
      >
        <p className={styles.roleInfo}>I am a Student</p>
        <img
          className={styles.roleIcon}
          src="images/icons/student.png"
          alt="student icon"
        />
      </button>
    </div>
  );
}

export default RoleSelection;
