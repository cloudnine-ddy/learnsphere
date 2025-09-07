// need to import each of the components here
import React, { useState } from "react";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import TermsCheckbox from "../components/TermsCheckbox";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import Dropdown from "../components/Dropdown";

import styles from "./RegisterForm.module.css";

function RegisterForm() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    const [role, setRole] = useState("");
    const roles = [
        { value: "mr", label: "Mr" },
        { value: "mrs", label: "Mrs" },
        { value: "ms", label: "Ms" },
        { value: "dr", label: "Dr" },
    ];

    const submitForm = (e) => { 
        e.preventDefault();
        let message = []
        if (password !== confirmPassword) {
            message.push("Passwords do not match");
        }
        if (password.length < 5) {
            message.push("Password must be at least 5 characters");
        }
        if (message.length > 0) {
            setErrorMessages(message);
            return;
        }
        console.log("submit form");
        setErrorMessages([]);
        console.log(firstName, lastName, email, password, confirmPassword);
    }
    
    

    return (
        <form className={styles.infoSection} onSubmit={submitForm}>
            <div className={styles.infoHeader}>
                <h1 className={styles.infoTitle}>Sign Up</h1>
            </div>

            <div className={styles.infoScroll}>

                <Dropdown label="Title" id="role" placeholder="Choose a role…" value={role} onChange={setRole} options={roles} />

                <InputField label="First Name" id="firstName" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <InputField label="Last Name" id="lastName" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <InputField label="Email" id="email" placeholder="Enter email"  value={email} onChange={(e) => setEmail(e.target.value)} />

                <PasswordField label="Password" id="password" placeholder="Enter password"  value={password} onChange={(e) => setPassword(e.target.value)} />
                <PasswordField label="Confirm Password" id="confirmPassword" placeholder="Re-enter password"  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <InputField label="Token" id="token" placeholder="Enter token"  value={email} onChange={(e) => setEmail(e.target.value)} />
                <ErrorMessage messages={errorMessages} />
            </div>

            <div className={styles.infoFooter}>
                <TermsCheckbox />
                <Button type="submit"  >Register</Button>
                <div className={styles.haveAccount}>Have an account?<a href=""> Login Here</a></div>
            </div>
        </form>
    );
}

export default RegisterForm;

