import React, {useState} from "react";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

import styles from "./LoginForm.module.css";

function LoginForm() {
  console.log("help")
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([])

  const submitForm = (e) => {
    e.preventDefault();
    let message = []
    if (!email.includes("@gmail.com")) {
      message.push("Enter a valid email!")
    }

    if (message.length > 0) {
      setErrorMessages(message);
      return;
    }
    console.log("login successful")
    navigate("/reg");
    setErrorMessages([]);
    console.log(username,password,errorMessages)
  }

  return (
      <form onSubmit={submitForm} className={styles.infoFooter}>
        <div className={styles.infoSection}>
          <div className={styles.infoHeader}>
            <h1 className={styles.infoTitle}>Login</h1>
          </div>

<<<<<<< HEAD
        <div className={styles.infoScroll}>
            <InputField label="Email" id="email" placeholder="Enter email" />
            <PasswordField label="Password" id="password" placeholder="Enter password" />
        </div>

        <div className={styles.infoFooter}>
            <Button type="submit">Login</Button>
            <div className={styles.noAccount}>No account?<a href=""> Sign Up</a></div>
=======
          <div className={styles.infoScroll}>
            <InputField label="Email" id="email" placeholder="Enter email" value = {email} onChange={(e) => setEmail(e.target.value)}   />
            <PasswordField label="Password" id="password" placeholder="Enter password"  value={password} onChange={(e) => setPassword(e.target.value)} />

            {errorMessages.length>0 && (
                <div>
                  {errorMessages.map((msg,idx) => (
                      <p key = {idx} style={{ color: "red"}}>
                        {msg}
                      </p>
                  ))}
                </div>
            )}

          </div>

          <div className={styles.infoFooter}>
            <button type="submit">Login</button>
          </div>
>>>>>>> 513e262e3713e59968f69f1317b763b8f03e5fda
        </div>
      </form>
  );
}

export default LoginForm;
