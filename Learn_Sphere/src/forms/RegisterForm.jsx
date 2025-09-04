// need to import each of the components here
import React from "react";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import TermsCheckbox from "../components/TermsCheckbox";
import Button from "../components/Button";

import styles from "./RegisterForm.module.css";

function RegisterForm() {
    return (
        <div className={styles.infoSection}>
            <div className={styles.infoHeader}>
                <h1 className={styles.infoTitle}>Sign Up</h1>
            </div>

            <div className={styles.infoScroll}>
                <InputField label="Email" id="email" placeholder="Enter email" />
                <PasswordField label="Password" id="password" placeholder="Enter password" />
                <PasswordField label="ConfirmPassword" id="confirmPassword" placeholder="Re-enter password" />
                <InputField label="Token" id="token" placeholder="Enter token" />
            </div>

            <div className={styles.infoFooter}>
                <TermsCheckbox />
                <Button type="submit">Register</Button>
            </div>
        </div>
    );
}

export default RegisterForm;

