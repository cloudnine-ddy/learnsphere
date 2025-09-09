// need to import each of the components here
import React, { useState } from "react";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import TermsCheckbox from "../components/TermsCheckbox";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import TitleDropdown from "../components/TitleDropdown";
import { useNavigate } from "react-router-dom";

import styles from "./RegisterForm.module.css";
import { registerUser } from "../components/manageUsers";

function RegisterForm({selectedRole}) {
    const navigate = useNavigate();
    let emailPattern = /\w+@\w+\.([a-z])+/;

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    const [role, setRole] = useState("");
    const roles = [
        { value: "", label: "" },
        { value: "Mr", label: "Mr" },
        { value: "Mrs", label: "Mrs" },
        { value: "Ms", label: "Ms" },
        { value: "Dr", label: "Dr" },
    ];

    const submitForm = (e) => { 
        e.preventDefault();
        let message = []
        if (password !== confirmPassword) {
            message.push("Passwords do not match");
        }
        if (!email.match(emailPattern)) {
            message.push("Enter a valid email!")
        }
        if (password.length < 5) {
            message.push("Password must be at least 5 characters");
        }
        if (message.length > 0) {
            setErrorMessages(message);
            return;
        }
        else
        {
            setErrorMessages([]);
        }

        console.log("Form submitted. Email: ", email, " Password: ", password, selectedRole); // Debugging log

        // Create user using Firebase Authentication
        // Reference function from imported JavaScript 
        registerUser(firstName, lastName, email, password, role, selectedRole)
            .then((user) => {
                console.log(user);
                if (user) {
                    console.log("User created successfully:", user); // Debugging log
                    navigate("/home"); // Redirect after successful signup
                    console.log(firstName, lastName, email, password, confirmPassword, role, selectedRole);
                }
            })
            .catch((error) => {
                console.error("Error creating user:", error); // Debugging log
                setErrorMessages([error]);
            });
        
        //console.log("submit form");
    }
    
    

    return (
        <form className={styles.infoSection} onSubmit={submitForm}>
            <div className={styles.infoHeader}>
                <h1 className={styles.infoTitle}>Sign Up</h1>
            </div>

            <div className={styles.infoScroll}>
                {selectedRole != "student" ? <TitleDropdown label="Title" id="role" placeholder="Choose a role…" value={role} onChange={setRole} options={roles} /> : false}
                <InputField label="First Name" id="firstName" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <InputField label="Last Name" id="lastName" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <InputField label="Email" id="email" placeholder="Enter email"  value={email} onChange={(e) => setEmail(e.target.value)} />

                <PasswordField label="Password" id="password" placeholder="Enter password"  value={password} onChange={(e) => setPassword(e.target.value)} />
                <PasswordField label="Confirm Password" id="confirmPassword" placeholder="Re-enter password"  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <InputField label="Token" id="token" placeholder="Enter token"  value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className={styles.infoFooter}>
                <TermsCheckbox />
                <Button type="submit"  >Register</Button>
                <ErrorMessage messages={errorMessages} />
                <div className={styles.haveAccount}>Have an account?<a href="/login"> Login Here</a></div>
            </div>
        </form>
    );
}

export default RegisterForm;

