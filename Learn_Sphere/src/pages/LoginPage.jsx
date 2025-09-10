import React from "react";
import AuthHeader from "../layout/AuthHeader"
import LoginForm from "../forms/LoginForm"

import styles from "./LoginPage.module.css";
import SingleButtonMessageBox from "../components/SingleButtonMessageBox";
import { useState } from "react";

function LoginPage() {
  console.log("LoginPage rendered");
  const [showError, setShowError] = useState(false);

  const handleError = (error) => {
    setShowError(false);
  }
  return (
        <div className={styles.mainContent}>
            <AuthHeader />
            <div className={styles.pageContent}>
                <LoginForm showError={showError} setShowError={setShowError}/>
            </div>
            {showError && <SingleButtonMessageBox label="Error" message="Invalid email or password" button_1="Try Again" onConfirm={handleError}/>}
        </div>
    );
}

export default LoginPage;