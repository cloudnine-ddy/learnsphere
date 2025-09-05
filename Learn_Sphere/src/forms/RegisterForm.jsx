// need to import each of the components here
import React, { useState } from "react";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import TermsCheckbox from "../components/TermsCheckbox";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import Student from "../../Models/Users/studentModel.js";

import styles from "./RegisterForm.module.css";

function RegisterForm() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);

    const submitForm = async (e) => { 
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

        const newStudent = new Student(0, firstName, lastName, email, password)

        const submitRequest = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newStudent),
        });
        console.log(submitRequest)
    }
     
    return (
        <form className={styles.infoSection} onSubmit={submitForm}>
            <div className={styles.infoHeader}>
                <h1 className={styles.infoTitle}>Sign Up</h1>
            </div>

            <div className={styles.infoScroll}>
                <InputField label="First Name" id="firstName" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <InputField label="Last Name" id="lastName" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <InputField label="Email" id="email" placeholder="Enter email"  value={email} onChange={(e) => setEmail(e.target.value)} />

                <PasswordField label="Password" id="password" placeholder="Enter password"  value={password} onChange={(e) => setPassword(e.target.value)} />
                <PasswordField label="Confirm Password" id="confirmPassword" placeholder="Re-enter password"  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <ErrorMessage messages={errorMessages} />
            </div>

            <div className={styles.infoFooter}>
                <TermsCheckbox />
                <Button type="submit"  >Register</Button>
            </div>
        </form>
    );
}

export default RegisterForm;

