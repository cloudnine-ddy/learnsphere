import React from "react";
import AuthHeader from "../layout/AuthHeader"
import LoginForm from "../forms/LoginForm"

import styles from "./LoginPage.module.css";

function LoginPage() {
    return (
        <div className={styles.mainContent}>
            <AuthHeader />
            <div className={styles.pageContent}>
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;