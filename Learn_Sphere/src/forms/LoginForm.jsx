import React, { useState } from "react";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import Button from "../components/Button";

import styles from "./LoginForm.module.css";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.infoSection}>
        <div className={styles.infoHeader}>
            <h1 className={styles.infoTitle}>Login</h1>
        </div>

        <div className={styles.infoScroll}>
            <InputField label="Email" id="email" placeholder="Enter email" />
            <PasswordField label="Password" id="password" placeholder="Enter password" />
        </div>

        <div className={styles.infoFooter}>
            <Button type="submit">Login</Button>
            <div className={styles.noAccount}>No account?<a href=""> Sign Up</a></div>
        </div>
    </div>
  );
}

export default LoginForm;
