import React, {useState} from "react";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

import styles from "./LoginForm.module.css";
import { signInUser } from "../components/manageUsers";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([])

  const submitForm = (e) => {
    e.preventDefault();
    let message = [];
    let emailPattern = /\w+@\w+\.([a-z])+/;

    if (!email.match(emailPattern)) {
      message.push("Enter a valid email!")
    }

    if (message.length > 0) {
      setErrorMessages(message);
      return;
    }
    else
    {
      setErrorMessages([]);
    }

    console.log("Form submitted. Email: ", email, " Password: ", password); // Debugging log

    // Sign in user using Firebase Authentication
    signInUser(email, password)
      .then((user) => {
        console.log(user);
        if (user) {
          console.log("User signed in:", user); // Debugging log
          navigate("/home");
          console.log(username,password,errorMessages)
        }
      })
      .catch((error) => {
        console.error("Error signing in user:", error); // Debugging log
        setErrorMessages([error]);
      });
    
    //console.log("login successful")
    //navigate("/home");
  }

  return (
      <form onSubmit={submitForm} className={styles.infoFooter}>
        <div className={styles.infoSection}>
          <div className={styles.infoHeader}>
            <h1 className={styles.infoTitle}>Login</h1>
          </div>

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
            <div className={styles.noAccount}>No account?<a href="/reg"> Sign Up</a></div>
          </div>
        </div>
      </form>
  );
}

export default LoginForm;
