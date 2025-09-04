import React from "react";
import AuthHeader from "../layout/AuthHeader";
import RoleSelection from "../components/RoleSelection";
import RegisterForm from "../forms/RegisterForm"

import styles from "./RegisterPage.module.css";

function RegisterPage() {
  return (
    <div className={styles.mainContent}>
      <AuthHeader />
      <div className={styles.pageContent}>
        <RoleSelection />
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
