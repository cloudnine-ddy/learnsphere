import React, {useState} from "react";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

import styles from "./LoginForm.module.css";

function LoginForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([])

  const submitForm = (e) => {
    e.preventDefault();
    let message = []
    let instructorBtn = document.getElementById("instructorBtn");
    let studentBtn = document.getElementById("studentBtn");

    if (!instructorBtn || !studentBtn) {
      message.push("Please select a role!");
    }

    if (message.length > 0) {
      setErrorMessages(message);
      return;
    }
    console.log("login successful")
    navigate("/register");
    setErrorMessages([]);
    console.log(username,password,errorMessages)
  }

  return (
      <div className={styles.infoSection}>
        <div className={styles.infoHeader}>
          <h1 className={styles.infoTitle}>Login</h1>
        </div>

        <div className={styles.infoScroll}>
          <InputField label="Username" id="username" placeholder="Enter username" value = {username} onChange={(e) => setUsername(e.target.value)}   />
          <PasswordField label="Password" id="password" placeholder="Enter password"  value={password} onChange={(e) => setPassword(e.target.value)} />


        </div>

        <div className={styles.infoFooter}>
          <Button type="submit">Login</Button>
        </div>
      </div>
  );
}

export default LoginForm;
